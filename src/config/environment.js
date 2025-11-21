/**
 * Environment Configuration
 * Manages API endpoints and settings for development and production
 */

const ENVIRONMENTS = {
  development: {
    API_BASE_URL: "http://localhost:5000/api",
    SOCKET_URL: "http://localhost:5000",
    APP_NAME: "School LMS (Dev)",
    DEBUG: true,
    TIMEOUT: 10000, // 10 seconds
  },
  production: {
    API_BASE_URL: "https://school-lms-backend-xsqm.onrender.com/api",
    SOCKET_URL: "https://school-lms-backend-xsqm.onrender.com",
    APP_NAME: "School LMS",
    DEBUG: false,
    TIMEOUT: 30000, // 30 seconds for Render cold starts
  },
};

// Detect environment
const getEnvironment = () => {
  // Check if running on localhost
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "";

  // Check environment variable (from .env file)
  const envFromFile = process.env.REACT_APP_ENV;

  // Priority: .env file > hostname detection
  if (envFromFile === "production") {
    return "production";
  }

  if (envFromFile === "development" || isLocalhost) {
    return "development";
  }

  // Default to production for safety
  return "production";
};

const ENV = getEnvironment();
const config = ENVIRONMENTS[ENV];

// Export configuration
export const API_BASE_URL = config.API_BASE_URL;
export const SOCKET_URL = config.SOCKET_URL;
export const APP_NAME = config.APP_NAME;
export const DEBUG = config.DEBUG;
export const TIMEOUT = config.TIMEOUT;
export const IS_PRODUCTION = ENV === "production";
export const IS_DEVELOPMENT = ENV === "development";

// Log current environment (only in development)
if (IS_DEVELOPMENT) {
  console.log("🔧 Environment:", ENV);
  console.log("🌐 API URL:", API_BASE_URL);
  console.log("🔌 Socket URL:", SOCKET_URL);
}

export default config;
