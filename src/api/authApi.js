import { authAxios } from "./axiosConfig";
import { API_ENDPOINTS } from "../utils/constants";

export const authApi = {
  // Login
  login: async (username, password) => {
    // KHÔNG dùng authAxios vì có interceptors + withCredentials
    // Dùng fetch trực tiếp
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30,
      }),
      // BỎ credentials: 'include' - đây là nguyên nhân gây lỗi CORS
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data;
  },

  // Get current user
  getCurrentUser: async () => {
    const token = localStorage.getItem("accessToken");
    const response = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user");
    }

    const data = await response.json();
    return data;
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const response = await fetch("https://dummyjson.com/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken,
        expiresInMins: 30,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    return data;
  },
};
