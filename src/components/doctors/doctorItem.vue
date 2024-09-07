<template>
  <div class="doctor-wrapper">
    <img class="doctor-avatar" :src="doctor.avatar" alt="" />
    <div class="info-wrapper">
      <span class="doctor-name">{{ doctor.name }}</span>
      <h5 class="doctor-speciality">{{ doctor.speciality }}</h5>
      <div class="social-wrapper">
        <linkedinIcon class="social-icon"></linkedinIcon>
        <facebookIcon class="social-icon"></facebookIcon>
        <instagramIcon class="social-icon"></instagramIcon>
      </div>
      <button class="doctor-button">View Profile</button>
    </div>
  </div>
</template>

<script setup>
import linkedinIcon from "../../assets/icons/linkdeIn.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import instagramIcon from "../../assets/icons/instagram.svg";
const props = defineProps({
  doctor: {
    type: Object,
    default: () => {},
  },
});
</script>
