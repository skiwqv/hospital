import { defineStore } from "pinia";
import { apiClient, authorizedApiClient } from "@/services/api";
import { useToast } from "vue-toast-notification";

export const useNotifStore = defineStore("notification", {
  state: () => ({
    socket: null,
    isConnected: false,
    notifications: [],
  }),

  actions: {
    async connectSocket() {
      const token = window.localStorage.getItem("access");

      this.socket = new WebSocket(
        `${import.meta.env.VITE_APP_SOCKET_URL}notification/?token=${token}`
      );

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.notifications.push(data.notification);
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      this.socket.onclose = () => {
        this.isConnected = false;
        this.socket = null;
      };
    },
    clearAllNotifications() {
      this.notifications = [];
    },

    clearRoomNotifications(roomName) {
      this.notifications = this.notifications.filter(
        (notification) => notification.room_name !== roomName
      );
    },
    async closeSocket() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
        this.isConnected = false;
      } else {
        console.warn("WebSocket is already closed.");
      }
    },
  },
});
