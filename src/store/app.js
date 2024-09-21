import { defineStore } from "pinia";
import { apiClient, authorizedApiClient } from "@/services/api";
import { getTokenFromCookies, deleteCookie } from "@/helpers/Cookies";
import { useToast } from "vue-toast-notification";

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
      const $toast = useToast();
      try {
        await apiClient.post("/patient/registration/", user);
        $toast.success("User registered successfully", {
          position: "bottom",
        });
      } catch (error) {
        $toast.error("Failed to register user", {
          position: "bottom",
        });
        console.error("Failed to register user:", error);
      }
    },
    async logInUser(user) {
      const $toast = useToast();
      try {
        const { data } = await apiClient.post("/users/login/", user);
        window.localStorage.setItem("access", data.accessToken);
        this.setAuthTokens(data.refreshToken);
        this.setAuthorizationHeader(data.accessToken);
        $toast.success("Logged in successfully", {
          position: "bottom",
        });
      } catch (error) {
        $toast.error("Login failed", {
          position: "bottom",
        });
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
      const $toast = useToast();
      try {
        const refreshToken = getTokenFromCookies("refresh");
        await authorizedApiClient.post("/users/logout/", {
          refresh: refreshToken,
        });
        this.clearAuthTokens();
        this.currentUser = null;
        $toast.success("Logged out successfully", {
          position: "bottom",
        });
      } catch (error) {
        $toast.error("Logout failed", {
          position: "bottom",
        });
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
      } catch (error) {
        console.error("Check token failed:", error);
      }
    },
    async finishDoctorRegister(user) {
      const $toast = useToast();
      try {
        await apiClient.patch("/doctor/update/", user);
        $toast.success("Doctor registration completed successfully", {
          position: "bottom",
        });
      } catch (error) {
        $toast.error("Doctor registration failed", {
          position: "bottom",
        });
        console.error("Doctor registration failed:", error);
      }
    },
    async updateProfile(user) {
      const $toast = useToast();
      try {
        await authorizedApiClient.patch("/users/update/", user, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        $toast.success("Profile updated successfully", {
          position: "bottom",
        });
      } catch (error) {
        $toast.error("Profile update failed", {
          position: "bottom",
        });
        console.error("Profile update failed:", error);
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
      } catch (error) {
        console.error("doctor failed:", error);
      }
    },
    setAuthTokens(refreshToken) {
      document.cookie = `refresh=${refreshToken};Secure;max-age=604800;`;
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
