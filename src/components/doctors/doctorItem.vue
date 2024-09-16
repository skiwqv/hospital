<template>
  <div class="doctor-wrapper">
    <img class="doctor-avatar" :src="doctor.avatar" alt="" />
    <div class="info-wrapper">
      <span class="doctor-name">{{
        `${doctor.first_name} ${doctor.last_name}`
      }}</span>
      <h5 class="doctor-speciality">{{ doctor.sub_role }}</h5>
      <button class="doctor-button" @click="toProfile(doctor.id)">
        View Profile
      </button>
    </div>
  </div>
</template>

<script setup>
import router from "../../router";

const props = defineProps({
  doctor: {
    type: Object,
    default: () => {},
  },
});
const toProfile = (id) => {
  router.push(`/profile-publick/${id}`);
};
</script>
