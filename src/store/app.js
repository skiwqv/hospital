import { defineStore } from "pinia";
import { apiClient, authorizedApiClient } from "../services/api";
import { getTokenFromCookies, deleteCookie } from "../helpers/Cookies";

export const useAppStore = defineStore("app", {
  state: () => ({
    currentUser: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.currentUser.id,
  },
  actions: {
    async registerUser(user) {
      await apiClient.post("/users/patient-registration/", user);
    },
    async logInUser(user) {
      const resp = await apiClient.post("/users/login/", user);
      document.cookie = `access=${resp.data.accessToken};Secure;max-age=86400;`;
      document.cookie = `refresh=${resp.data.refreshToken};Secure;max-age=86400;`;
      authorizedApiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${resp.data.accessToken}`;
    },
    async getUserData() {
      try {
        const resp = await authorizedApiClient.get("/users/detail/");
        this.currentUser = resp.data;
        console.log(this.currentUser);
      } catch (error) {
        console.error("Failed to get user data:", error);
      }
    },
    async logOut() {
      const refreshToken = getTokenFromCookies("refresh");
      authorizedApiClient.post("users/logout/", { refresh: refreshToken });
      deleteCookie("access");
      deleteCookie("refresh");
      this.currentUser = null;
    },
  },
});
