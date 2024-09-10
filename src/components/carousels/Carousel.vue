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

const visibleCount = 1;
const startIndex = ref(0);
let intervalId;

const visibleItems = computed(() => {
  let endIndex = startIndex.value + visibleCount;
  if (endIndex > props.items.length) {
    return [
      ...props.items.slice(startIndex.value, props.items.length),
      ...props.items.slice(0, endIndex - props.items.length),
    ];
  }
  return props.items.slice(startIndex.value, endIndex);
});

const indicators = computed(() => {
  return new Array(Math.ceil(props.items.length / visibleCount));
});

const isActiveIndicator = (index) => {
  return Math.floor(startIndex.value / visibleCount) === index;
};

const goToSlide = (index) => {
  startIndex.value = index * visibleCount;
};

const next = () => {
  startIndex.value = (startIndex.value + visibleCount) % props.items.length;
};

onMounted(() => {
  intervalId = setInterval(next, 8000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease; /* Можешь изменить продолжительность */
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
