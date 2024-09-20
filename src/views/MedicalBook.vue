<template>
  <div class="medical-wrapper">
    <h2 class="medical-text">Medical Book</h2>
    <section class="medical-general">
      <div class="avatar-box">
        <div class="dropzone">
          <img
            class="avatar"
            :src="
              imagePreview ||
              (currentUser.avatar ? currentUser.avatar : brendaPlaceholder)
            "
            alt=""
          />
        </div>
      </div>
      <div class="info-box">
        <h4 class="info-title">General Information</h4>
        <div class="info">
          <div class="wrapper">
            <span class="info-title">First Name:</span>
            <span class="info-text">{{ currentUser.first_name }}</span>
          </div>
          <div class="wrapper">
            <span class="info-title">Last Name:</span>
            <span class="info-text">{{ currentUser.last_name }}</span>
          </div>
          <div class="wrapper">
            <span class="info-title">Gender:</span>
            <span class="info-text">{{ currentUser.gender }}</span>
          </div>
        </div>
        <div class="info">
          <div class="wrapper">
            <span class="info-title">Phone:</span>
            <span class="info-text">{{ currentUser.phone }}</span>
          </div>
          <div class="wrapper">
            <span class="info-title">Birthday:</span>
            <span class="info-text">{{ currentUser.date_birth }}</span>
          </div>
          <div class="wrapper">
            <span class="info-title">Email:</span>
            <span class="info-text">{{ currentUser.email }}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="records">
      <h2>Doctors Records</h2>
      <div class="records-table">
        <table class="table">
          <thead class="table-head">
            <tr>
              <th class="head-title">Doctor</th>
              <th class="head-title">Diagnosis</th>
              <th class="head-title">Description</th>
              <th class="head-title">Treatment</th>
              <th class="head-title">Tests</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(records, index) in records"
              class="table-wrapper"
              :key="index"
            >
              <td
                class="table-content"
                @click="toDoctorProfile(records.doctor_id)"
              >
                {{ records.doctor_name }}
              </td>
              <td class="table-content">{{ records.diagnosis }}</td>
              <td class="table-content">{{ records.description }}</td>
              <td class="table-content">{{ records.treatment }}</td>
              <td class="icon-wrapper">
                <TickIcon class="icon" v-if="records.tests"></TickIcon>
                <CrossIcon class="icon" v-else></CrossIcon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useAppStore } from "@/store/app";
import { useAppointmentStore } from "../store/appointment";
import TickIcon from "@/assets/icons/tick.svg";
import CrossIcon from "@/assets/icons/cross.svg";
const appStore = useAppStore();
const appointmentStore = useAppointmentStore();

const currentUser = computed(() => appStore.currentUser);
const records = computed(() => appointmentStore.records);

onMounted(async () => {
  await appointmentStore.getRecords();
});
</script>

<style></style>
