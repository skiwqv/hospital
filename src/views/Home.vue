<template>
  <div class="home-wrapper">
    <section class="images-wrapper">
      <div class="banner">
        <img class="image" src="@/assets/images/home.png" alt="" />
        <div class="banner-holder">
          <div class="banner-text">
            <span class="subtitle-base">Caring for Life</span>
            <h1 class="title-base">
              Leading the Way <br />
              in Medical Excellence
            </h1>
            <router-link to="/appointment">
              <button class="nav-button">Appointment</button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="bg"></div>
      <div class="rectangle"></div>
      <div class="rectangle reverse"></div>
      <div class="box-wrapper">
        <div class="box primary">
          <span class="box-text">Book an Appointment</span>
          <callendar />
        </div>
        <div class="box accent">
          <span class="box-text">Book an Appointment</span>
          <users />
        </div>
        <div class="box secondary">
          <span class="box-text">Book an Appointment</span>
          <cash />
        </div>
      </div>
    </section>
    <section class="welcome-wrapper">
      <span class="subtitle-base">Welcome to Meddical</span>
      <h2 class="title-base welcome-title">A Great Place to Receive Care</h2>
      <p class="welcome-paragraph">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        placerat scelerisque tortor ornare ornare. Convallis felis vitae tortor
        augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim
        et.
      </p>
      <div class="link-button-wrapper">
        <span class="link-button-text">Learn More</span>
        <img src="@/assets/images/Vector.png" alt="" />
      </div>
      <img
        class="welcome-image"
        src="@/assets/images/welcome_image.png"
        alt=""
      />
    </section>
    <section class="services-wrapper">
      <span class="subtitle-base">Care you can believe in</span>
      <h2 class="title-base">Our Services</h2>
      <tabs></tabs>
    </section>
    <section class="specialties-wrapper">
      <span class="subtitle-base">Always Caring</span>
      <h2 class="title-base">Our Specialties</h2>
      <div class="specialties-container">
        <div class="specialty" v-for="specialty in specialties">
          <heart class="heart-icon"></heart>
          <span class="specialty-title">{{ specialty }}</span>
        </div>
      </div>
    </section>
    <section class="doctors-wrapper-section">
      <span class="subtitle-base">Trusted Care</span>
      <h2 class="title-base">Our Doctors</h2>
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
import Callendar from "@/assets/icons/Calendar.svg";
import Users from "@/assets/icons/Team.svg";
import Cash from "@/assets/icons/Cash.svg";
import Tabs from "@/components/tabs/tabs.vue";
import Heart from "@/assets/icons/heart.svg";
import DoctorItem from "@/components/doctors/doctorItem.vue";
import Carousel from "@/components/carousels/Carousel.vue";
import Contacts from "@/components/home/contacts.vue";
const appStore = useAppStore();

const allDoctors = computed(() => appStore.allDoctors);

const specialties = ref([
  "Neurology",
  "Bones",
  "Oncology",
  "Otorhinolaryngology",
  "Ophthalmology",
  "Cardiovascular",
  "Pulmonology",
  "Renal Medicine",
  "Gastroenterology",
  "Urology",
  "Dermatology",
  "Gynaecology",
]);
</script>

<style></style>
