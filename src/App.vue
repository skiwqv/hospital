<template>
  <div>
    <progres-bar v-if="loading"></progres-bar>
    <router-view v-else></router-view>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from "vue";
import { useAppStore } from "@/store/app";
import { useNotifStore } from "@/store/notifications";
import ProgresBar from "@/components/progressbars/ProgresBar.vue";

const appStore = useAppStore();
const notificationStore = useNotifStore();

let loading = ref(false);
let progress = ref(0);

onMounted(async () => {
  loading.value = true;
  await appStore.getAllDoctors((progressValue) => {
    progress.value = progressValue;
  });
  const token = window.localStorage.getItem("access");
  if (token) {
    await appStore.getUserData();
  }
  loading.value = false;
});

watch(
  () => appStore.currentUser,
  (newUser) => {
    if (newUser && !notificationStore.socket) {
      notificationStore.connectSocket();
    } else if (!newUser && notificationStore.socket) {
      notificationStore.closeSocket();
    }
  }
);
</script>

<style scoped lang="scss"></style>
