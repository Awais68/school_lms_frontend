import React, { createContext, useContext, useReducer, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        refreshToken: null,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    loading: false,
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken"),
    error: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (token && refreshToken) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: JSON.parse(localStorage.getItem("user")),
          token,
          refreshToken,
        },
      });
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.data.success) {
        const { data } = response.data;

        // Save to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: data.user,
            token: data.token,
            refreshToken: data.refreshToken,
          },
        });

        return { success: true, data };
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: response.data.message || "Login failed",
        });
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      dispatch({
        type: "LOGIN_FAILURE",
        payload: message,
      });
      return { success: false, message };
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
  };

  const register = async (userData) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await api.post("/auth/register", userData);

      if (response.data.success) {
        const { data } = response.data;

        // Save to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: data.user,
            token: data.token,
            refreshToken: data.refreshToken,
          },
        });

        return { success: true, data };
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: response.data.message || "Registration failed",
        });
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      dispatch({
        type: "LOGIN_FAILURE",
        payload: message,
      });
      return { success: false, message };
    }
  };

  const value = {
    ...state,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
