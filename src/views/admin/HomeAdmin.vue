<template>
  <div class="admin-home">
    <button class="nav-button" @click="createDoctor">Create Doctor</button>
    <pre>{{ response }}</pre>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAdminStore } from "../../store/admin";

const adminStore = useAdminStore();

const response = ref(null);

const createDoctor = () => {
  const resp = adminStore.createDoctor();
  response.value = resp;
};
</script>

<style></style>
