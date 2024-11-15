import { defineStore } from "pinia";
import { apiClient, authorizedApiClient } from "@/services/api";
import { useToast } from "vue-toast-notification";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    currentUser: null,
    allUsers: null,
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
    async getAllUsers() {
      try {
        const { data } = await authorizedApiClient.get("/users/admin/users/");
        this.allUsers = data;
      } catch (error) {
        console.log(error);
      }
    },
    async toggleBlockUser(id, action) {
      const $toast = useToast();
      try {
        await authorizedApiClient.patch(`/users/admin/block/`, {
          user_id: id,
        });
        const successMessage =
          action === "block"
            ? "User blocked successfully"
            : "User unblocked successfully";
        $toast.success(successMessage, {
          position: "bottom",
        });
      } catch (err) {
        const errorMessage =
          action === "block"
            ? "Failed to block user"
            : "Failed to unblock user";
        $toast.error(errorMessage, {
          position: "bottom",
        });
      }
    },
  },
});
