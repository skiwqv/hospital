<template>
  <div class="progress-wrapper">
    <span class="logo-text"
      >Med<span class="logo-text-secondary">dical</span></span
    >
    <div class="progress-bar">
      <div class="progress-bar__fill" :style="fillStyle"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  progress: {
    type: Number,
    required: true,
  },
});

const fillStyle = computed(() => ({
  width: `${Math.min(Math.max(props.progress, 0), 100)}%`,
}));
</script>
