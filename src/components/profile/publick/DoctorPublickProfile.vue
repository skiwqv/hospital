<template>
  <div v-if="props.doctor" class="profile-page">
    <div class="general">
      <div class="avatar-box">
        <div class="dropzone">
          <img class="avatar" :src="props.doctor.avatar" alt="" />
        </div>
        <h3 class="profile-name">{{ fullName }}</h3>
        <button class="update-button" @click="toAppointment">
          Book Appointment
        </button>
      </div>
      <div class="info-box">
        <h4 class="info-title">General Information</h4>
        <div class="info">
          <div class="wrapper">
            <span class="info-title">First Name:</span>
            <span class="info-text">{{ props.doctor.first_name }}</span>
          </div>
          <div class="wrapper">
            <span class="info-title">Last Name:</span>
            <span class="info-text">{{ props.doctor.last_name }}</span>
          </div>
          <div class="wrapper">
            <span class="info-title">Speciality:</span>
            <span class="info-text">{{ props.doctor.sub_role }}</span>
          </div>
        </div>
        <div class="info">
          <div class="wrapper">
            <span class="info-title">Phone:</span>
            <span class="info-text">{{ props.doctor.phone }}</span>
          </div>
          <div class="wrapper">
            <span class="info-title">Birthday:</span>
            <span class="info-text">{{ props.doctor.date_birth }}</span>
          </div>
          <div class="wrapper">
            <span class="info-title">Email:</span>
            <span class="info-text">{{ props.doctor.email }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import router from "@/router";

const props = defineProps({
  doctor: {
    type: Object,
    default: () => {},
  },
});

const fullName = computed(() => {
  return `${props.doctor.first_name} ${props.doctor.last_name}`;
});

const toAppointment = () => {
  router.push({
    path: "/appointment",
    query: {
      doctor: props.doctor.id,
      specialty: props.doctor.sub_role,
    },
  });
};
</script>

<style></style>
