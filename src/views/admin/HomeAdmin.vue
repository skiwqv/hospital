<template>
  <div class="admin-home">
    <input
      class="base-input"
      v-model="email"
      type="email"
      placeholder="Doctor Email"
    />
    <button class="nav-button" @click="createDoctor">Create Doctor</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAdminStore } from "@/store/admin";

const adminStore = useAdminStore();
let email = ref("");

const createDoctor = () => {
  adminStore.createDoctor(email.value);
};
</script>

<style></style>
