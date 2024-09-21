import { defineStore } from "pinia";
import { apiClient, authorizedApiClient } from "@/services/api";
import { useToast } from "vue-toast-notification";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    currentUser: null,
  }),

  getters: {},

  actions: {
    async createDoctor(email) {
      const $toast = useToast();
      try {
        const resp = await authorizedApiClient.post("/doctor/registration/", {
          email: email,
        });
        $toast.success("Doctor registered successfully", {
          position: "bottom",
        });
        return resp.data;
      } catch (error) {
        $toast.error("Failed to register doctor", {
          position: "bottom",
        });
        console.error("Failed to register doctor:", error);
      }
    },
  },
});
