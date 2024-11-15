<template>
  <div v-if="userById" class="profile-wrapper">
    <h2 class="profile-text">{{ `${userById.first_name} profile` }}</h2>
    <div class="profiles-holder">
      <DoctorProfile
        v-if="userById.roles == 'doctor'"
        :doctor="userById"
      ></DoctorProfile>
      <UserProfile v-else :user="userById"></UserProfile>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import DoctorProfile from "@/components/profile/publick/DoctorPublickProfile.vue";
import UserProfile from "@/components/profile/publick/UserProfilePublick.vue";
import { useAppStore } from "@/store/app";
import { useRoute } from "vue-router";

const route = useRoute();

const appStore = useAppStore();
const userById = computed(() => appStore.userById);

onMounted(async () => {
  const userId = route.params.id;
  await appStore.getUserById(userId);
});
</script>

<style></style>
