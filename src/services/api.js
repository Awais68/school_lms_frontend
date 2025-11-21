import axios from "axios";
import { API_BASE_URL, TIMEOUT, DEBUG } from "../config/environment";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (DEBUG) {
      console.log("📤 API Request:", config.method?.toUpperCase(), config.url);
    }

    return config;
  },
  (error) => {
    if (DEBUG) {
      console.error("❌ Request Error:", error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    if (DEBUG) {
      console.log("📥 API Response:", response.config.url, response.status);
    }
    return response;
  },
  (error) => {
    if (DEBUG) {
      console.error("❌ API Error:", error.response?.status, error.config?.url);
    }

    if (error.response?.status === 401) {
      // Token expired or invalid, logout user
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
