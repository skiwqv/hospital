import { defineStore } from "pinia";
import { apiClient, authorizedApiClient } from "@/services/api";
import { useToast } from "vue-toast-notification";
export const useAppointmentStore = defineStore("appointment", {
  state: () => ({
    doctors: null,
    time: null,
    appointments: null,
    records: null,
    record: null,
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
      } catch (error) {}
    },
    async makeAppointment(data) {
      const $toast = useToast();
      try {
        await authorizedApiClient.post("/appointment/create/", data);
        $toast.success("Appointment booked successfully", {
          position: "bottom",
        });
      } catch (error) {
        $toast.error("Failed to book appointment", {
          position: "bottom",
        });
      }
    },
    async getAppointments() {
      try {
        const { data } = await authorizedApiClient.get("/appointment/get/");
        this.appointments = data;
      } catch (error) {}
    },
    async isAppointment(id) {
      try {
        const resp = await authorizedApiClient.get("/book/create/", {
          params: {
            patient_id: id,
          },
        });
        return resp;
      } catch (error) {}
    },
    async createReccord(data) {
      const $toast = useToast();
      try {
        const resp = await authorizedApiClient.post("/book/create/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        $toast.success("Record added successfully", {
          position: "bottom",
        });
      } catch (error) {
        $toast.error("Failed to add record", {
          position: "bottom",
        });
      }
    },
    async getRecords() {
      try {
        const { data } = await authorizedApiClient.get("/book/get-all/");
        this.records = data;
      } catch (error) {}
    },
    async getRecordById(id) {
      try {
        const { data } = await authorizedApiClient.get("/book/get/", {
          params: {
            id: id,
          },
        });
        this.record = data;
      } catch (error) {}
    },
  },
});
