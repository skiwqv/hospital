import { defineStore } from "pinia";
import { apiClient, authorizedApiClient } from "@/services/api";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    currentUser: null,
  }),

  getters: {},

  actions: {
    async createDoctor(email) {
      try {
        const resp = await authorizedApiClient.post("/doctor/registration/", {
          email: email,
        });

        return resp.data;
      } catch (error) {
        console.error("Failed to register user:", error);
      }
    },
  },
});
