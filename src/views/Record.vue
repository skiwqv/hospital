<template>
  <div
    v-if="record"
    v-for="recordItem in record"
    :key="recordItem.id"
    class="record"
  >
    <div class="record-block">
      <button class="update-button" @click="router.go(-1)">Back</button>
      <h2 class="record-title">Diagnosis</h2>
      <p class="record-text">{{ recordItem.diagnosis }}</p>
    </div>

    <div class="record-block">
      <h2 class="record-title">Description</h2>
      <p class="record-text">{{ recordItem.description }}</p>
    </div>

    <div class="record-block">
      <h2 class="record-title">Treatment</h2>
      <p class="record-text">{{ recordItem.treatment }}</p>
    </div>

    <div class="record-block" v-if="recordItem.tests">
      <h2 class="record-title">Medical Tests</h2>
      <img :src="recordItem.tests" class="record-test" @click="openImage" />
    </div>

    <div
      v-if="isImageOpen && recordItem.tests"
      class="overlay"
      @click="closeImage"
    >
      <img
        :src="recordItem.tests"
        :class="['fullscreen-image', { zoomed: isImageZoomed }]"
        @click.stop="toggleZoom"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAppointmentStore } from "@/store/appointment";
import { useRoute } from "vue-router";
import router from "@/router";

const route = useRoute();
const appointmentStore = useAppointmentStore();
const record = computed(() => appointmentStore.record);

const isImageOpen = ref(false);
const isImageZoomed = ref(false);

const openImage = () => {
  isImageOpen.value = true;
};

const closeImage = () => {
  isImageOpen.value = false;
  isImageZoomed.value = false;
};

const toggleZoom = () => {
  isImageZoomed.value = !isImageZoomed.value;
};

onMounted(async () => {
  let id = route.params.id;
  await appointmentStore.getRecordById(id);
  console.log(record.value);
});
</script>
