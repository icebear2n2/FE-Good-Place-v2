export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async signup(username, email, password) {
    const response = await this.http.fetch("/users/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    return response;
  }

  async login(email, password) {
    const data = await this.http.fetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    this.tokenStorage.saveToken(data.accessToken, data.refreshToken);
    return data;
  }

  async me() {
    const token = this.tokenStorage.getAccessToken();
    return this.http.fetch("/token/info", {
      method: "GET",
      headers: { "X-Auth-Token": `${token}` },
    });
  }

  async logout() {
    this.tokenStorage.clearToken();
  }
}
