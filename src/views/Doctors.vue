<template>
  <div class="doctors-wrapper">
    <section class="banner">
      <img class="image" src="../assets/images/welcome_image.png" alt="" />
      <div class="banner-holder">
        <div class="banner-text">
          <h1 class="title-base">Our Doctors</h1>
        </div>
      </div>
    </section>
    <section class="doctors">
      <doctorItem
        v-for="(doctor, index) in doctors"
        :key="index"
        :doctor="doctor"
      />
    </section>
    <contacts class="contacts"></contacts>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Brenda from "../assets/images/brenda.jpg";
import DoctorItem from "../components/doctors/doctorItem.vue";
import Contacts from "../components/home/contacts.vue";
const doctors = ref([
  {
    avatar: Brenda,
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
