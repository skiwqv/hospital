// Utilities

import { defineStore } from "pinia";
import apiClient from "../services/api";
export const useAppStore = defineStore("app", {
  state: () => ({
    currentUser: null,
  }),
  getters: {},
  actions: {
    registerUser: async (user) => {
      const resp = await apiClient.post("/users/patient-registration/", user);
      console.log(resp);
    },
  },
});
