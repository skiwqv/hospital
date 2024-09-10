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

// Получаем массив карточек через props
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

// Реактивное количество видимых карточек (изначально 1)
const visibleCount = ref(1);
const startIndex = ref(0);
let intervalId;

// Рассчитываем видимые карточки
const visibleItems = computed(() => {
  if (props.items.length === 0) return []; // Если нет элементов, возвращаем пустой массив

  let endIndex = startIndex.value + visibleCount.value;
  if (endIndex > props.items.length) {
    return [
      ...props.items.slice(startIndex.value, props.items.length),
      ...props.items.slice(0, endIndex - props.items.length),
    ];
  }
  return props.items.slice(startIndex.value, endIndex);
});

// Индикаторы для карусели
const indicators = computed(() => {
  if (visibleCount.value <= 0 || props.items.length === 0) return []; // Проверка для исключения ошибки
  return new Array(Math.ceil(props.items.length / visibleCount.value));
});

// Проверка активного индикатора
const isActiveIndicator = (index) => {
  return Math.floor(startIndex.value / visibleCount.value) === index;
};

// Переключение на конкретный слайд
const goToSlide = (index) => {
  startIndex.value = index * visibleCount.value;
};

// Следующий слайд
const next = () => {
  startIndex.value =
    (startIndex.value + visibleCount.value) % props.items.length;
};

// Функция для изменения количества видимых карточек
const updateVisibleCount = () => {
  if (window.innerWidth <= 768) {
    visibleCount.value = 1; // Для мобильных устройств
  } else if (window.innerWidth <= 1024) {
    visibleCount.value = 2; // Для планшетов
  } else {
    visibleCount.value = 3; // Для больших экранов
  }
};

// Инициализация карусели
onMounted(() => {
  updateVisibleCount(); // Изначально задаем количество карточек
  window.addEventListener("resize", updateVisibleCount); // Обновляем при изменении экрана
  intervalId = setInterval(next, 8000); // Автопереключение через 8 секунд
});

// Очищаем интервал и слушатель
onBeforeUnmount(() => {
  clearInterval(intervalId);
  window.removeEventListener("resize", updateVisibleCount);
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
