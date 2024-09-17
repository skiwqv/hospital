import { defineStore } from "pinia";
import { apiClient, authorizedApiClient } from "@/services/api";

export const useAppointmentStore = defineStore("appointment", {
  state: () => ({
    doctors: null,
    time: null,
    appointments: null,
  }),

  getters: {},

  actions: {
    async getDoctors(specialty) {
      try {
        const resp = await authorizedApiClient.get("/doctor/specialist/", {
          params: {
            specialization: specialty,
          },
        });
        this.doctors = resp.data;
      } catch (error) {}
    },
    async getTime(id, date) {
      try {
        const { data } = await authorizedApiClient.get("/doctor/time/", {
          params: {
            doctor: id,
            date: date,
          },
        });
        this.time = data;
        console.log(this.time);
      } catch (error) {}
    },
    async makeAppointment(data) {
      try {
        await authorizedApiClient.post("/patient/create-appointment/", data);
      } catch (error) {}
    },
    async getAppointments() {
      try {
        const { data } = await authorizedApiClient.get(
          "/patient/get-appointments/"
        );
        this.appointments = data;
      } catch (error) {}
    },
  },
});
