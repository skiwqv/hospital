<template>
  <div class="profile-wrapper">
    <h2 class="profile-text">Profile</h2>
    <div class="profiles-holder">
      <DoctorProfile v-if="currentUser.role == 'doctor'"></DoctorProfile>
      <UserProfile v-else></UserProfile>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import DoctorProfile from "../components/profile/DoctorProfile.vue";
import UserProfile from "../components/profile/UserProfile.vue";
import { useAppStore } from "../store/app";
const appStore = useAppStore();

const currentUser = computed(() => appStore.currentUser);
</script>

<style></style>
