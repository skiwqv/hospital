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
            <span class="info-title">Gender:</span>
            <input
              v-model="currentUser.gender"
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
      <h2>Booked appointments</h2>
      <div class="appointments-table">
        <table class="table">
          <thead class="table-head">
            <tr>
              <th class="head-title">Doctor</th>
              <th class="head-title">Department</th>
              <th class="head-title">Date</th>
              <th class="head-title">Time</th>
              <th class="head-title">Message</th>
              <th class="head-title">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(appointment, index) in appointments" :key="index">
              <td class="table-content">{{ appointment.doctor }}</td>
              <td class="table-content">{{ appointment.department }}</td>
              <td class="table-content">{{ appointment.date }}</td>
              <td class="table-content">{{ appointment.time }}</td>
              <td class="table-content">{{ appointment.message }}</td>
              <td class="icon-wrapper">
                <DeleteIcon
                  class="delete-icon"
                  @click="deleteAppointment(index)"
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

// Пример данных для таблицы
const appointments = ref([
  {
    doctor: "Dr. Brenda Cooper",
    department: "Cardiology",
    date: "2024-09-15",
    time: "10:30 AM",
    message: "Follow-up appointment",
  },
  {
    doctor: "Dr. James Smith",
    department: "Orthopedics",
    date: "2024-09-18",
    time: "02:00 PM",
    message: "Initial consultation",
  },
  {
    doctor: "Dr. Amanda Lee",
    department: "Pediatrics",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Child's regular checkup",
  },
  {
    doctor: "Dr. Amanda Lee",
    department: "Pediatrics",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Child's regular checkup",
  },
  {
    doctor: "Dr. Amanda Lee",
    department: "Pediatrics",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Child's regular checkup",
  },
  {
    doctor: "Dr. Amanda Lee",
    department: "Pediatrics",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Child's regular checkup",
  },
  {
    doctor: "Dr. Amanda Lee",
    department: "Pediatrics",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Child's regular checkup",
  },
  {
    doctor: "Dr. Amanda Lee",
    department: "Pediatrics",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Child's regular checkup",
  },
  {
    doctor: "Dr. Amanda Lee",
    department: "Pediatrics",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Child's regular checkup",
  },
  {
    doctor: "Dr. Amanda Lee",
    department: "Pediatrics",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Child's regular checkup",
  },
  {
    doctor: "Dr. Amanda Lee",
    department: "Pediatrics",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Child's regular checkup",
  },
  {
    doctor: "Dr. Amanda Lee",
    department: "Pediatrics",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Child's regular checkup",
  },
  {
    doctor: "Dr. Amanda Lee",
    department: "Pediatrics",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Child's regular checkup",
  },
  {
    doctor: "Dr. Amanda Lee",
    department: "Pediatrics",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Child's regular checkup",
  },
  {
    doctor: "Dr. Amanda Lee",
    department: "Pediatrics",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Child's regular checkup",
  },
  {
    doctor: "Dr. Amanda Lee",
    department: "Pediatrics",
    date: "2024-09-20",
    time: "09:00 AM",
    message: "Child's regular checkup",
  },
  {
    doctor: "Dr. Amanda Lee",
    department: "Pediatrics",
    date: "2024-09-20",
    time: "09:00 AM",
    message:
      " Child's regular checkupChild's regular checkupChild's regular checkupChild's regular checkupChild's regular checkupChild's regular checkup",
  },
]);

// Функция для удаления записи
const deleteAppointment = (index) => {
  appointments.value.splice(index, 1);
};
</script>

<style></style>
