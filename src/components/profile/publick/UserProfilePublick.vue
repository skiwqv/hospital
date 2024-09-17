<template>
  <div v-if="props.user" class="profile-page">
    <div class="general">
      <div class="avatar-box">
        <div class="dropzone">
          <img class="avatar" :src="props.user.avatar" alt="" />
        </div>
        <h3 class="profile-name">{{ fullName }}</h3>
      </div>
      <div class="info-box">
        <h4 class="info-title">General Information</h4>
        <div class="info">
          <div class="wrapper">
            <span class="info-title">First Name:</span>
            <span class="info-text">{{ props.user.first_name }}</span>
          </div>
          <div class="wrapper">
            <span class="info-title">Last Name:</span>
            <span class="info-text">{{ props.user.last_name }}</span>
          </div>
          <div class="wrapper">
            <span class="info-title">Gender:</span>
            <span class="info-text">{{ props.user.gender }}</span>
          </div>
        </div>
        <div class="info">
          <div class="wrapper">
            <span class="info-title">Phone:</span>
            <span class="info-text">{{ props.user.phone }}</span>
          </div>
          <div class="wrapper">
            <span class="info-title">Birthday:</span>
            <span class="info-text">{{ props.user.date_birth }}</span>
          </div>
          <div class="wrapper">
            <span class="info-title">Email:</span>
            <span class="info-text">{{ props.user.email }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  user: {
    type: Object,
    default: () => {},
  },
});

const fullName = computed(() => {
  return `${props.user.first_name} ${props.user.last_name}`;
});
</script>

<style></style>
