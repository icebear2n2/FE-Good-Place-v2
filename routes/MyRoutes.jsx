import { Route, Routes } from "react-router";
import Template from "../templates/Template";
import Main from "../pages/Main";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { AuthProvider } from "../context/AuthContext";
import TokenStorage from "../services/localStorage/token";
import HttpClient from "../network/http";
import AuthService from "../services/api/auth";
import { AuthErrorEventBus } from "../context/AuthContext";
import { OAuthLoginHandler } from "../components/OAuthLoginHandler";
import Blog from "../pages/Blog";

const MyRoutes = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const tokenStorage = new TokenStorage();
  const httpClient = new HttpClient(baseURL);
  const authService = new AuthService(httpClient, tokenStorage);
  const authErrorEventBus = new AuthErrorEventBus();
  return (
    <AuthProvider
      authService={authService}
      authErrorEventBus={authErrorEventBus}
    >
      <Routes>
        <Route element={<Template />}>
          <Route path="/" element={<Main />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/token-handler" element={<OAuthLoginHandler />} />
          <Route path="/blog" element={<Blog />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default MyRoutes;
