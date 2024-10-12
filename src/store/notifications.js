import { defineStore } from "pinia";
import { apiClient, authorizedApiClient } from "@/services/api";
import { useToast } from "vue-toast-notification";

export const useNotifStore = defineStore("notification", {
  state: () => ({
    notifications: [],
  }),

  actions: {
    async connectSocket() {
      const token = window.localStorage.getItem("access");

      this.socket = new WebSocket(
        `${import.meta.env.VITE_APP_SOCKET_URL}notification/?token=${token}`
      );

      this.socket.onopen = (event) => {
        console.log(event);
        console.log("WebSocket connection established");
      };
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        this.notifications.push(data.notification);
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      this.socket.onclose = () => {
        console.log("WebSocket connection closed");
        this.isConnected = false;
        this.socket = null;
      };
    },
  },
});
