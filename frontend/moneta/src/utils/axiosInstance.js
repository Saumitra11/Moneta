import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseUrl: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error(
            data?.message || "Bad Request. Please check your input."
          );
          break;

        case 401:
          console.error(data?.message || "Unauthorized. Please log in again.");
          window.location.href = "/login";
          break;

        case 403:
          console.error(
            data?.message || "Forbidden. You do not have permission."
          );
          break;

        case 404:
          console.error(
            data?.message || "Not Found. The requested resource doesn't exist."
          );
          break;

        case 409:
          console.error(data?.message || "Conflict. Resource already exists.");
          break;

        case 500:
          console.error(
            data?.message || "Server error. Please try again later."
          );
          break;

        default:
          console.error(data?.message || "An unexpected error occurred.");
      }
    } else if (error.code === "ECONNABORTED") {
      // Timeout
      console.error("Request timeout. Please try again later.");
    } else {
      // No response (network down, server unreachable, CORS, etc.)
      console.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
