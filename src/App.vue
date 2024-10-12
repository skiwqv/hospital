<template>
  <router-view></router-view>
</template>
<script setup>
import { onMounted, watch } from "vue";
import { useAppStore } from "@/store/app";
import { useNotifStore } from "@/store/notifications";

const appStore = useAppStore();
const notificationStore = useNotifStore();

const token = window.localStorage.getItem("access");
onMounted(() => {
  if (token) {
    appStore.getUserData();
    notificationStore.connectSocket();
  }
});
</script>

<style scoped lang="scss"></style>
