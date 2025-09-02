export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
  },
  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/api/v1/income/add",
    GET_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (id) => `/api/v1/income/${id}`,
    DOWNLOAD_REPORT: "/api/v1/income/download-report",
  },
  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expense/add",
    GET_EXPENSE: "/api/v1/expense/get",
    DELETE_EXPENSE: (id) => `/api/v1/expense/${id}`,
    DOWNLOAD_REPORT: "/api/v1/expense/download-report",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  }
};
