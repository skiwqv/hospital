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
      <Carousel :items="doctors">
        <template #default="{ visibleItems }">
          <doctorItem
            v-for="(doctor, index) in visibleItems"
            :key="index"
            :doctor="doctor"
          />
        </template>
      </Carousel>
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
import doctorItem from "../components/doctors/doctorItem.vue";
import Carousel from "../components/carousels/Carousel.vue";
import brenda from "../assets/images/brenda.jpg";
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
const doctors = ref([
  {
    avatar: brenda,
    name: "Dr. John Smith",
    speciality: "Cardiologist",
    social: {
      linkedin: "https://linkedin.com/in/johnsmith",
      facebook: "https://twitter.com/drjohnsmith",
      instagram: "https://linkedin.com/in/johnsmith",
    },
  },
  {
    avatar:
      "https://www.findablackdoctor.com/wp-content/themes/fabd/src/assets/hp-hero.jpg",
    name: "Dr. Emily Davis",
    speciality: "Dermatologist",
    social: {
      linkedin: "https://linkedin.com/in/emilydavis",
      twitter: "https://twitter.com/dremilydavis",
    },
  },
  {
    avatar:
      "https://thumbs.dreamstime.com/b/african-american-black-doctor-man-over-blue-background-89747885.jpg",
    name: "Dr. Michael Brown",
    speciality: "Neurologist",
    social: {
      linkedin: "https://linkedin.com/in/michaelbrown",
      twitter: "https://twitter.com/drmichaelbrown",
    },
  },
  {
    avatar:
      "https://img.freepik.com/free-photo/african-american-black-doctor-man-with-stethoscope-isolated-white-background_231208-2222.jpg",
    name: "Dr. Sarah Johnson",
    speciality: "Pediatrician",
    social: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/drsarahjohnson",
    },
  },
  {
    avatar: "https://thumbs.dreamstime.com/b/young-black-doctor-19300858.jpg",
    name: "Dr. David Wilson",
    speciality: "Orthopedic Surgeon",
    social: {
      linkedin: "https://linkedin.com/in/davidwilson",
      twitter: "https://twitter.com/drdavidwilson",
    },
  },
  {
    avatar:
      "https://st3.depositphotos.com/9970522/13230/i/1600/depositphotos_132301200-stock-photo-african-american-black-doctor-man.jpg",
    name: "Dr. Olivia Taylor",
    speciality: "Ophthalmologist",
    social: {
      linkedin: "https://linkedin.com/in/oliviataylor",
      twitter: "https://twitter.com/droliviataylor",
    },
  },
]);
</script>

<style></style>
