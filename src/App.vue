<template>
  <router-view></router-view>
</template>
<script setup>
import { onMounted, watch } from "vue";
import { useAppStore } from "./store/app";
import { getTokenFromCookies } from "./helpers/Cookies";
const appStore = useAppStore();
const token = getTokenFromCookies("access");
// watch(token, () => {
//   if (token.value) {
//     appStore.getUserData();
//   }
// });
onMounted(() => {
  if (token) {
    appStore.getUserData();
  }
});
</script>

<style scoped lang="scss"></style>
