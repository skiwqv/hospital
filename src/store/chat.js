import { defineStore } from "pinia";
import { apiClient, authorizedApiClient } from "@/services/api";
import { useToast } from "vue-toast-notification";
import sendMessageAudio from "@/assets/audio/send_message.wav";

export const useChatStore = defineStore("chat", {
  state: () => ({
    socket: null,
    isConnected: false,
    roomName: "",
    messages: [],
    resentChats: [],
  }),

  actions: {
    async connectSocket(roomName) {
      const token = window.localStorage.getItem("access");

      this.socket = new WebSocket(
        `${import.meta.env.VITE_APP_SOCKET_URL}chat/${roomName}/?token=${token}`
      );

      this.socket.onopen = (event) => {
        console.log("WebSocket connection established");
        this.isConnected = true;
      };
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);

        switch (data.type) {
          case "delete_message": {
            const message = this.messages.find(
              (msg) => msg.id === data.messages.id
            );
            if (message) {
              message.is_deleted = true;
            }
            break;
          }

          case "edit_message": {
            const message = this.messages.find(
              (msg) => msg.id === data.messages.id
            );
            if (message) {
              message.is_edited = true;
              message.content = data.messages.content;
            }
            break;
          }

          default: {
            if (
              typeof data.messages === "object" &&
              !Array.isArray(data.messages)
            ) {
              this.messages.push(data.messages);
            } else if (Array.isArray(data.messages)) {
              this.messages = data.messages;
            }
            break;
          }
        }
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

    async sendMessage(message) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        const formattedMessage = JSON.stringify(message);
        this.socket.send(formattedMessage);
        const audio = new Audio(sendMessageAudio);
        audio.play();
      } else {
        console.error("WebSocket is not open. Cannot send message.");
      }
    },

    async deleteMessage(message) {
      const $toast = useToast();
      try {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          const formattedMessage = JSON.stringify(message);
          this.socket.send(formattedMessage);
          $toast.success("Message deleted successfully", {
            position: "bottom",
          });
        }
      } catch (error) {
        $toast.error(`Failed to delete message ${error}`, {
          position: "bottom",
        });
      }
    },
    async editMessage(message) {
      const $toast = useToast();
      try {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          const formattedMessage = JSON.stringify(message);
          this.socket.send(formattedMessage);
          $toast.success("Message edited successfully", {
            position: "bottom",
          });
        }
      } catch (error) {
        $toast.error(`Failed to edit message ${error}`, {
          position: "bottom",
        });
      }
    },

    async replyMessage(message) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        const formattedMessage = JSON.stringify(message);
        this.socket.send(formattedMessage);
      }
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

    checkConnection() {
      return this.isConnected;
    },

    async checkRoom(secondUserId) {
      try {
        const { data } = await authorizedApiClient.post("/chat/get_room/", {
          user_id: secondUserId,
        });
        this.roomName = data.room_name;
      } catch (error) {
        console.error("doctor failed:", error);
      }
    },
    async getResentChats() {
      const { data } = await authorizedApiClient.get("/chat/get_chat/");
      console.log(data);
      this.resentChats = data;
    },
  },
});
