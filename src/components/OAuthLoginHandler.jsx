import React, { useEffect } from "react";
import TokenStorage from "../services/localStorage/token";

export function OAuthLoginHandler() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");

    if (accessToken && refreshToken) {
      const tokenStorage = new TokenStorage();
      tokenStorage.saveToken(accessToken, refreshToken);

      window.location.href = "http://localhost:3000"; // Redirect to home
    } else {
      // Handle error or redirect to login page
    }
  }, []);

  return <div>Loading...</div>;
}
