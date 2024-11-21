<template>
  <div class="doctors-wrapper">
    <section class="banner">
      <img class="image" src="@/assets/images/welcome_image.png" alt="" />
      <div class="banner-holder">
        <div class="banner-text">
          <h1 class="title-base">Our Doctors</h1>
        </div>
      </div>
    </section>
    <section class="doctors">
      <doctorItem
        v-for="(doctor, index) in allDoctors"
        :key="index"
        :doctor="doctor"
      />
    </section>
    <contacts class="contacts"></contacts>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useAppStore } from "@/store/app";
const appStore = useAppStore();
const allDoctors = computed(() => appStore.allDoctors);

import DoctorItem from "@/components/doctors/doctorItem.vue";
import Contacts from "@/components/home/contacts.vue";
</script>

<style></style>
