<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useAppStore } from "@/store/app";
import { useNotifStore } from "@/store/notifications";

const appStore = useAppStore();
const notificationStore = useNotifStore();

onMounted(() => {
  const token = window.localStorage.getItem("access");

  if (token) {
    appStore.getUserData();
  }
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
