<template>
  <router-view></router-view>
</template>
<script setup>
import { onMounted, watch } from "vue";
import { useAppStore } from "./store/app";
const appStore = useAppStore();
const token = window.localStorage.getItem("access");
onMounted(() => {
  if (token) {
    appStore.getUserData();
  }
});
</script>

<style scoped lang="scss"></style>
