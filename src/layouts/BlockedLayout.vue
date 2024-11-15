<template>
  <div class="blocked-user-layout">
    <div class="blocked-content">
      <h1 class="title">Account Blocked</h1>
      <p class="message">
        Your account has been temporarily blocked due to a violation of our
        community guidelines. If you believe this is a mistake, please contact
        our support team for further assistance.
      </p>
      <p class="contact-support" @click="logOut">Log Out</p>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "@/store/app";
const appStore = useAppStore();
import router from "@/router";

const logOut = async () => {
  await appStore.logOut();
  router.push("/");
};
</script>
