import axios from "axios";
import { getTokenFromCookies } from "../helpers/Cookies";
const token = getTokenFromCookies("access");
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVICE_URL,
});

const authorizedApiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVICE_URL,
});

if (token) {
  authorizedApiClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
}

export { apiClient, authorizedApiClient };
