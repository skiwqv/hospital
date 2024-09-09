// Utilities

import { defineStore } from "pinia";
import apiClient from "../services/api";
export const useAppStore = defineStore("app", {
  state: () => ({}),
  getters: {},
  actions: {
    logBack: async () => {
      const response = await apiClient.get("/admin");
      console.log(response.data);
    },
  },
});
