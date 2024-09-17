import axios from "axios";
import { getTokenFromCookies, deleteCookie } from "@/helpers/Cookies";

const token = window.localStorage.getItem("access");
const refreshToken = getTokenFromCookies("refresh");

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVICE_URL,
});

const authorizedApiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const isCorrectRefreshError = (status) => status === 401;

const refreshTokenRequest = async () => {
  try {
    const response = await authorizedApiClient.post("/api/token/refresh/", {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;
    window.localStorage.setItem("access", newAccessToken);
    return newAccessToken;
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};

const errorInterceptor = async (error) => {
  console.log("Interceptor triggered");
  const originalRequest = error.config;
  const { status } = error.response;

  if (isCorrectRefreshError(status)) {
    try {
      const newToken = await refreshTokenRequest();

      authorizedApiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newToken}`;

      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

      return authorizedApiClient(originalRequest);
    } catch (tokenRefreshError) {
      window.localStorage.removeItem("access");
      deleteCookie("refresh");
      return Promise.reject(tokenRefreshError);
    }
  }

  return Promise.reject(error);
};

if (token) {
  authorizedApiClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;

  authorizedApiClient.interceptors.response.use(
    (response) => response,
    (error) => errorInterceptor(error)
  );
}

export { apiClient, authorizedApiClient };
