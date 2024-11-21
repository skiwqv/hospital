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
      <div class="records-table" v-if="records && records.lenght">
        <table class="table">
          <thead class="table-head">
            <tr>
              <th class="head-title">Doctor</th>
              <th class="head-title">Diagnosis</th>
              <th class="head-title">Description</th>
              <th class="head-title">Treatment</th>
              <th class="head-title">Date</th>
              <th class="head-title">Tests</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(records, index) in records"
              class="table-wrapper"
              :key="index"
              @click="toRecord(records.id)"
            >
              <td class="table-content">
                {{ records.doctor_name }}
              </td>
              <td class="table-content">{{ records.diagnosis }}</td>
              <td class="table-content">{{ records.description }}</td>
              <td class="table-content">{{ records.treatment }}</td>
              <td class="table-content">
                {{ formatDate(records.created_at) }}
              </td>
              <td class="icon-wrapper">
                <TickIcon class="icon" v-if="records.tests"></TickIcon>
                <CrossIcon class="icon" v-else></CrossIcon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>There are no doctor's records yet</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useAppStore } from "@/store/app";
import { useAppointmentStore } from "@/store/appointment";
import { formatDate } from "@/helpers/Formater";
import TickIcon from "@/assets/icons/tick.svg";
import CrossIcon from "@/assets/icons/cross.svg";
import router from "@/router";
const appStore = useAppStore();
const appointmentStore = useAppointmentStore();

const currentUser = computed(() => appStore.currentUser);
const records = computed(() => appointmentStore.records);

const toRecord = (id) => {
  router.push(`/record/${id}`);
};

onMounted(async () => {
  await appointmentStore.getRecords();
});
</script>

<style></style>
