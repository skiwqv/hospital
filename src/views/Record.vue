<template>
  <div v-if="records" class="record">
    <div class="record-block">
      <h2 class="record-title">Diagnosis</h2>
      <p class="record-text">{{ record.diagnosis }}</p>
    </div>

    <div class="record-block">
      <h2 class="record-title">Description</h2>
      <p class="record-text">{{ record.description }}</p>
    </div>

    <div class="record-block">
      <h2 class="record-title">Treatment</h2>
      <p class="record-text">{{ record.treatment }}</p>
    </div>

    <div class="record-block">
      <h2 class="record-title">Medical Tests</h2>
      <img :src="record.tests" class="record-test" @click="openImage" />
    </div>

    <div v-if="isImageOpen" class="overlay" @click="closeImage">
      <img
        :src="record.tests"
        :class="['fullscreen-image', { zoomed: isImageZoomed }]"
        @click.stop="toggleZoom"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAppointmentStore } from "@/store/appointment";

const appointmentStore = useAppointmentStore();
const records = computed(() => appointmentStore.records);
const record = computed(() => records.value[0]);

// States for tracking open and zoomed image
const isImageOpen = ref(false);
const isImageZoomed = ref(false);

const openImage = () => {
  isImageOpen.value = true;
};

const closeImage = () => {
  isImageOpen.value = false;
  isImageZoomed.value = false; // Reset zoom on close
};

const toggleZoom = () => {
  isImageZoomed.value = !isImageZoomed.value;
};

onMounted(async () => {
  await appointmentStore.getRecords();
});
</script>
