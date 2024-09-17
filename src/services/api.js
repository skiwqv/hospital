import axios from "axios";
import { getTokenFromCookies, deleteCookie } from "@/helpers/Cookies";
const token = window.localStorage.getItem("access");
const refresh = getTokenFromCookies("refresh");
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVICE_URL,
});

const authorizedApiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

if (token) {
  authorizedApiClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
}

const refreshTokenRequest = async () => {
  try {
    const response = await authorizedApiClient.post("/api/token/refresh/", {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access_token;
    window.localStorage.setItem("access", newAccessToken);
    return newAccessToken;
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};

// authorizedApiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         const newAccessToken = await refreshTokenRequest();

//         authorizedApiClient.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${newAccessToken}`;
//         originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

//         return authorizedApiClient(originalRequest);
//       } catch (refreshError) {
//         window.localStorage.removeItem("access");
//         deleteCookie("refresh");
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export { apiClient, authorizedApiClient };
