import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext({});

export function AuthProvider({ authService, authErrorEventBus, children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    authErrorEventBus.listen((err) => {
      console.log(err);
      setUser(undefined);
    });
  }, [authErrorEventBus]);

  const signUp = useCallback(
    async (username, email, password) => {
      try {
        await authService.signup(username, email, password);
      } catch (error) {
        console.error(error);
      }
    },
    [authService],
  );

  const logIn = useCallback(
    async (email, password) => {
      try {
        await authService.login(email, password);
        const currentUser = await authService.me();
        console.log(currentUser);
        setUser(currentUser);
      } catch (error) {
        console.error(error);
      }
    },
    [authService],
  );

  const logout = useCallback(
    async () => authService.logout().then(() => setUser(undefined)),
    [authService],
  );

  const context = useMemo(
    () => ({ user, signUp, logIn, logout }),
    [user, signUp, logIn, logout],
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export class AuthErrorEventBus {
  listen(callback) {
    this.callback = callback;
  }

  notify(error) {
    this.callback(error);
  }
}

export default AuthContext;
export const useAuth = () => useContext(AuthContext);
