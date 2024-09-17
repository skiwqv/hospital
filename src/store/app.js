import { defineStore } from "pinia";
import { apiClient, authorizedApiClient } from "@/services/api";
import { getTokenFromCookies, deleteCookie } from "@/helpers/Cookies";

export const useAppStore = defineStore("app", {
  state: () => ({
    currentUser: null,
    subRoles: null,
    allDoctors: null,
    userById: null,
  }),

  getters: {},

  actions: {
    async registerUser(user) {
      try {
        await apiClient.post("/patient/registration/", user);
      } catch (error) {
        console.error("Failed to register user:", error);
      }
    },

    async logInUser(user) {
      try {
        const { data } = await apiClient.post("/users/login/", user);
        window.localStorage.setItem("access", data.accessToken);
        this.setAuthTokens(data.accessToken, data.refreshToken);
        this.setAuthorizationHeader(data.accessToken);
      } catch (error) {
        console.error("Login failed:", error);
      }
    },

    async getUserData() {
      try {
        const { data } = await authorizedApiClient.get("/users/detail/");
        this.currentUser = data;
        return data;
      } catch (error) {
        console.error("Failed to get user data:", error);
      }
    },

    async logOut() {
      try {
        const refreshToken = getTokenFromCookies("refresh");
        await authorizedApiClient.post("/users/logout/", {
          refresh: refreshToken,
        });
        this.clearAuthTokens();
        this.currentUser = null;
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
    async checkTocken(key) {
      try {
        const resp = await apiClient.post("/doctor/key-validate/", {
          access_key: key,
        });
        localStorage.setItem("doctor_id", resp.data.id);
        return resp;
      } catch (error) {
        console.error("Check token failed:", error);
      }
    },
    async getSubRoles() {
      try {
        const resp = await apiClient.get("/users/subroles/");
        this.subRoles = resp.data.sub_roles;
        console.log(this.subRoles);
      } catch (error) {
        console.error("Check token failed:", error);
      }
    },
    async finishDoctorRegister(user) {
      try {
        await apiClient.patch("/doctor/update/", user);
      } catch (error) {
        console.error("doctor failed:", error);
      }
    },
    async updateProfile(user) {
      try {
        await authorizedApiClient.patch("/users/update/", user, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("doctor failed:", error);
      }
    },
    async getAllDoctors() {
      try {
        const { data } = await authorizedApiClient.get("/doctor/all/");
        this.allDoctors = data;
      } catch (error) {
        console.error("doctor failed:", error);
      }
    },
    async getUserById(id) {
      try {
        const { data } = await authorizedApiClient.get("/users/specific/", {
          params: {
            user_id: id,
          },
        });
        this.userById = data;
        console.log("userData", this.userById);
      } catch (error) {
        console.error("doctor failed:", error);
      }
    },
    setAuthTokens(refreshToken) {
      document.cookie = `refresh=${refreshToken};Secure;max-age=86400;`;
    },

    setAuthorizationHeader(token) {
      authorizedApiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    },

    clearAuthTokens() {
      window.localStorage.removeItem("access");
      deleteCookie("refresh");
    },
  },
});
