import { defineStore } from "pinia";
import { apiClient, authorizedApiClient } from "../services/api";
// import { getTokenFromCookies, deleteCookie } from "../helpers/Cookies";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    currentUser: null,
  }),

  getters: {},

  actions: {
    async createDoctor() {
      try {
        const resp = await authorizedApiClient.post("/users/doctor/create/");
        console.log(resp.data);

        return resp.data;
      } catch (error) {
        console.error("Failed to register user:", error);
      }
    },
  },
});
