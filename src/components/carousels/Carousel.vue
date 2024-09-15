<template>
  <div class="carusel-holder">
    <div class="carousel">
      <Transition name="slide" mode="out-in">
        <ul :key="visibleItems">
          <slot :visibleItems="visibleItems"></slot>
        </ul>
      </Transition>
    </div>
    <div class="carousel__indicators">
      <span
        v-for="(item, index) in indicators"
        :key="index"
        :class="['indicator', { active: isActiveIndicator(index) }]"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const visibleCount = ref(1);
const startIndex = ref(0);
let intervalId;

const visibleItems = computed(() => {
  if (props.items.length === 0) return [];

  let endIndex = startIndex.value + visibleCount.value;
  if (endIndex > props.items.length) {
    return [
      ...props.items.slice(startIndex.value, props.items.length),
      ...props.items.slice(0, endIndex - props.items.length),
    ];
  }
  return props.items.slice(startIndex.value, endIndex);
});

const indicators = computed(() => {
  if (visibleCount.value <= 0 || props.items.length === 0) return [];
  return new Array(Math.ceil(props.items.length / visibleCount.value));
});

const isActiveIndicator = (index) => {
  return Math.floor(startIndex.value / visibleCount.value) === index;
};

const goToSlide = (index) => {
  startIndex.value = index * visibleCount.value;
};

const next = () => {
  startIndex.value =
    (startIndex.value + visibleCount.value) % props.items.length;
};

const updateVisibleCount = () => {
  if (window.innerWidth <= 768) {
    visibleCount.value = 1;
  } else if (window.innerWidth <= 1024) {
    visibleCount.value = 2;
  } else {
    visibleCount.value = 3;
  }
};

onMounted(() => {
  updateVisibleCount();
  window.addEventListener("resize", updateVisibleCount);
  intervalId = setInterval(next, 8000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
  window.removeEventListener("resize", updateVisibleCount);
});
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
}
</style>
