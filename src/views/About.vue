<template>
  <div class="about-wrapper">
    <section class="banner">
      <img class="image" src="@/assets/images/welcome_image.png" alt="" />
      <div class="banner-holder">
        <div class="banner-text">
          <h1 class="title-base">About Us</h1>
        </div>
      </div>
    </section>
    <section class="about-info-wrapper">
      <div>
        <img
          class="info-image"
          src="@/assets/images/about-image.png"
          alt="about-image"
        />
      </div>
      <div class="info-wrapper">
        <span class="subtitle-base">Welcome to Meddical</span>
        <h2 class="title-base">Best Care for Your Good Health</h2>
        <ul class="content-list">
          <li
            v-for="(item, index) in list"
            :key="index"
            class="content-list-item"
          >
            <span class="list-circle"></span>
            {{ item.text }}
          </li>
        </ul>
        <p class="info-paragraph">
          At Meddical, we believe in providing the highest quality healthcare
          services with a personal touch. Our team is dedicated to improving the
          lives of our patients through a commitment to excellence, innovation,
          and compassion. Your well-being is our top priority, and we strive to
          offer the best care possible for your health and happiness.
        </p>
      </div>
    </section>
    <section class="doctors-wrapper">
      <span class="subtitle-base">Trusted Care</span>
      <h2 class="title-base welcome-title">Our Doctors</h2>
      <Carousel v-if="allDoctors" :items="allDoctors">
        <template #default="{ visibleItems }">
          <doctorItem
            v-for="(doctor, index) in visibleItems"
            :key="index"
            :doctor="doctor"
          />
        </template>
      </Carousel>
    </section>
    <contacts></contacts>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useAppStore } from "@/store/app";
import Carousel from "@/components/carousels/Carousel.vue";
import DoctorItem from "@/components/doctors/doctorItem.vue";
import Contacts from "@/components/home/contacts.vue";

const appStore = useAppStore();

const allDoctors = computed(() => appStore.allDoctors);

const list = ref([
  { text: "A Passion for Healing" },
  { text: "5-Star Care" },
  { text: "All our best" },
  { text: "Believe in Us" },
  { text: "Always Caring" },
  { text: "A Legacy of Excellence" },
]);

onMounted(async () => {
  await appStore.getAllDoctors();
});
</script>

<style></style>
