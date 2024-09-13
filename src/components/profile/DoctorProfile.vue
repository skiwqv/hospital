<template>
  <div class="profile-page">
    <div class="general">
      <div class="avatar-box">
        <div class="dropzone">
          <img class="avatar" src="../../assets/images/brenda.jpg" alt="" />
          <input type="file" required hidden id="imge" />
          <label for="imge">
            <UploadIcon class="upload-icon"></UploadIcon>
          </label>
        </div>
        <h3 class="profile-name">{{ fullName }}</h3>
        <button class="update-button">Update</button>
      </div>
      <div class="info-box">
        <h4 class="info-title">General Information</h4>
        <div class="info">
          <div class="wrapper">
            <span class="info-title">First Name:</span>
            <input
              v-model="currentUser.first_name"
              type="text"
              class="info-input"
            />
          </div>
          <div class="wrapper">
            <span class="info-title">Last Name:</span>
            <input
              v-model="currentUser.last_name"
              type="text"
              class="info-input"
            />
          </div>
          <div class="wrapper">
            <span class="info-title">Speciality:</span>
            <input
              v-model="currentUser.sub_role"
              disabled
              type="text"
              class="info-input"
            />
          </div>
        </div>
        <div class="info">
          <div class="wrapper">
            <span class="info-title">Phone:</span>
            <input v-model="currentUser.phone" type="tel" class="info-input" />
          </div>
          <div class="wrapper">
            <span class="info-title">Birthday:</span>
            <input
              v-model="currentUser.date_birth"
              type="date"
              class="info-input"
            />
          </div>
          <div class="wrapper">
            <span class="info-title">Email:</span>
            <input
              v-model="currentUser.email"
              type="email"
              class="info-input"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="appointments">
      <h2>Patients with Appointments</h2>
      <div class="appointments-table">
        <table class="table">
          <thead class="table-head">
            <tr>
              <th class="head-title">Patient</th>
              <th class="head-title">Date</th>
              <th class="head-title">Time</th>
              <th class="head-title">Message</th>
              <th class="head-title">Cancel</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(appointment, index) in appointments" :key="index">
              <td class="table-content">{{ appointment.patient }}</td>
              <td class="table-content">{{ appointment.date }}</td>
              <td class="table-content">{{ appointment.time }}</td>
              <td class="table-content">{{ appointment.message }}</td>
              <td class="icon-wrapper">
                <DeleteIcon
                  class="delete-icon"
                  @click="cancelAppointment(index)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAppStore } from "../../store/app";
import UploadIcon from "../../assets/icons/upload.svg";
import DeleteIcon from "../../assets/icons/delete.svg";

const appStore = useAppStore();

const currentUser = computed(() => appStore.currentUser);
const fullName = computed(() => {
  return `${currentUser.value.first_name} ${currentUser.value.last_name}`;
});

// Пример данных для таблицы пациентов
const appointments = ref([
  {
    patient: "John Doe",
    date: "2024-09-15",
    time: "10:30 AM",
    message: "Follow-up consultation",
  },
  {
    patient: "Jane Smith",
    date: "2024-09-18",
    time: "02:00 PM",
    message: "Initial consultation",
  },
  {
    patient: "Michael Johnson",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Regular check-up",
  },
  {
    patient: "Michael Johnson",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Regular check-up",
  },
  {
    patient: "Michael Johnson",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Regular check-up",
  },
  {
    patient: "Michael Johnson",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Regular check-up",
  },
  {
    patient: "Michael Johnson",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Regular check-up",
  },
]);

// Функция для отмены записи
const cancelAppointment = (index) => {
  appointments.value.splice(index, 1);
};
</script>

<style></style>
