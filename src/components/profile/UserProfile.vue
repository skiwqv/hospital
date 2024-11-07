<template>
  <div class="profile-page">
    <section class="general">
      <div class="avatar-box">
        <div class="dropzone">
          <img
            class="avatar"
            :src="
              imagePreview ||
              (currentUser.avatar ? currentUser.avatar : brendaPlaceholder)
            "
            alt="User avatar"
          />
          <input type="file" required hidden id="imge" @change="onFileChange" />
          <label for="imge" title="Upload your photo">
            <UploadIcon class="upload-icon"></UploadIcon>
          </label>
        </div>
        <h3 class="profile-name">{{ fullName }}</h3>
        <button
          class="update-button"
          title="Update your profile"
          @click="updateProfile"
        >
          Update
        </button>
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
              disabled
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
          <button class="update-button">
            <router-link class="link" to="/forgot-password"
              >Change Password</router-link
            >
          </button>
        </div>
      </div>
    </section>
    <section class="appointments">
      <h2>Booked appointments</h2>
      <div
        v-if="appointments && appointments.length"
        class="appointments-table"
      >
        <table class="table">
          <thead class="table-head">
            <tr>
              <th class="head-title">Doctor</th>
              <th class="head-title">Date</th>
              <th class="head-title">Time</th>
              <th class="head-title">Message</th>
              <th class="head-title">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(appointment, index) in appointments" :key="index">
              <td
                title="Open doctor profile"
                class="table-content link"
                @click="toDoctorProfile(appointment.doctor_id)"
              >
                {{ appointment.doctor_name }}
              </td>
              <td class="table-content">{{ formatDate(appointment.date) }}</td>
              <td class="table-content">{{ formatTime(appointment.time) }}</td>
              <td class="table-content">{{ appointment.message }}</td>
              <td class="icon-wrapper" title="Delete Appointment">
                <DeleteIcon
                  class="delete-icon"
                  @click="deleteAppointment(index)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 v-else>There are no doctor's appointments yet</h4>
    </section>

    <section class="appointments">
      <h2>Medical Book</h2>
      <button
        class="update-button"
        title="Open your Medical Book"
        @click="toMedBook"
      >
        Open Medical Book
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAppStore } from "@/store/app";
import { useAppointmentStore } from "@/store/appointment";
import { formatDate, formatTime } from "@/helpers/Formater";

import UploadIcon from "@/assets/icons/upload.svg";
import DeleteIcon from "@/assets/icons/delete.svg";
import brendaPlaceholder from "@/assets/images/placeholder.png";
import router from "@/router";

const appStore = useAppStore();
const appointmentStore = useAppointmentStore();

const currentUser = computed(() => appStore.currentUser);
const appointments = computed(() => appointmentStore.appointments);

const fullName = computed(() => {
  return `${currentUser.value.first_name} ${currentUser.value.last_name}`;
});

const imageSrc = ref(null);
const imagePreview = ref(null);

const onFileChange = (event) => {
  const file = event.target.files[0];
  imageSrc.value = file;
  imagePreview.value = URL.createObjectURL(file);
};

const updateProfile = () => {
  try {
    const user = {
      first_name: currentUser.value.first_name,
      last_name: currentUser.value.last_name,
      email: currentUser.value.email,
      avatar: imageSrc.value,
      phone: currentUser.value.phone,
    };
    appStore.updateProfile(user);
  } catch (error) {}
};

const toDoctorProfile = (id) => {
  router.push(`/profile-publick/${id}`);
};

const toMedBook = () => {
  router.push("/medical-book");
};

const deleteAppointment = (index) => {
  appointments.value.splice(index, 1);
};

onMounted(async () => {
  await appointmentStore.getAppointments();
});
</script>

<style></style>
