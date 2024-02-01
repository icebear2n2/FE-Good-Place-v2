import axios from "axios";

axios.defaults.baseURL = "https://dapi.kakao.com";
const apiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;
export const myAxios = async (url, method, body) => {
  try {
    const { data } = await axios({
      method,
      url,
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `KakaoAK ${apiKey}`,
      },
    });
    return { body: data, status: "success" };
  } catch (error) {
    return { body: null, status: "err or" };
  }
};
