<template>
  <div class="profile-page">
    <div class="general">
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
        </div>
      </div>
    </div>

    <Table
      title="Booked appointments"
      :data="appointments"
      :columns="[
        { label: 'Patient', key: 'patient_name', clickable: true },
        { label: 'Date', key: 'date' },
        { label: 'Time', key: 'time' },
        { label: 'Message', key: 'message' },
      ]"
      :deleteHandler="deleteAppointment"
      :loading="loading"
      emptyMessage="There are no doctor's appointments yet"
      @viewProfile="toProfile"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useAppStore } from "@/store/app";
import { useAppointmentStore } from "@/store/appointment";
import UploadIcon from "@/assets/icons/upload.svg";
import DeleteIcon from "@/assets/icons/delete.svg";

import brendaPlaceholder from "@/assets/images/placeholder.png";
import router from "@/router";
import { formatTime, sortDatesDescending } from "@/helpers/Formater";
import Table from "@/components/tables/Table.vue";

const appStore = useAppStore();
const appointmentStore = useAppointmentStore();
const currentUser = computed(() => appStore.currentUser);
const appointments = computed(() => appointmentStore.appointments);
const fullName = computed(() => {
  return `${currentUser.value.first_name} ${currentUser.value.last_name}`;
});

const imageSrc = ref(null);
const imagePreview = ref(null);
const loading = ref(true);

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

const cancelAppointment = (index) => {
  appointments.value.splice(index, 1);
};

const toProfile = (data) => {
  let id = data.patient_id;

  router.push(`/profile-publick/${id}`);
};

watch(appointments, (newAppointments) => {
  if (newAppointments && newAppointments.length) {
    appointmentStore.appointments = sortDatesDescending(
      newAppointments,
      "date"
    );
  }
});

onMounted(async () => {
  loading.value = true;
  await appointmentStore.getAppointments();
  loading.value = false;
});
</script>

<style></style>
