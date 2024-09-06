<template>
  <div class="home-wrapper">
    <div class="images-wrapper">
      <div class="banner">
        <img class="image" src="../assets/images/home.png" alt="" />
        <div class="banner-holder">
          <div class="banner-text">
            <span class="subtitle-base">Caring for Life</span>
            <h1 class="title-base">
              Leading the Way <br />
              in Medical Excellence
            </h1>
            <button class="nav-button">Our Services</button>
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
    </div>
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
        <img src="../assets/images/Vector.png" alt="" />
      </div>
      <img src="../assets/images/welcome_image.png" alt="" />
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
    <section class="book-wrapper">
      <img
        class="book-image"
        src="../assets/images/bookImage.png"
        alt="background image"
      />
      <div class="text-holder">
        <div class="text">
          <div class="text-wrapper">
            <h2 class="book-title">Book an Appointment</h2>
            <p class="book-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              placerat scelerisque tortor ornare ornare. Convallis felis vitae
              tortor augue. Velit nascetur proin massa in. Consequat faucibus
              porttitor enim et.
            </p>
          </div>
          <baseForm></baseForm>
        </div>
      </div>
    </section>
    <section class="doctors-wrapper">
      <span class="subtitle-base">Trusted Care</span>
      <h2 class="title-base welcome-title">Our Doctors</h2>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import callendar from "../components/icons/callendar.vue";
import users from "../components/icons/users.vue";
import cash from "../components/icons/cash.vue";
import tabs from "../components/tabs/tabs.vue";
import heart from "../assets/icons/heart.svg";
import baseForm from "../components/forms/baseForm.vue";
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
