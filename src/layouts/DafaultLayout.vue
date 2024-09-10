<template>
  <header class="header">
    <div class="upper-header-wrapper">
      <div class="logo-wrapper">
        <span class="logo-text"
          >Med<span class="logo-text-secondary">dical</span></span
        >
      </div>
      <div class="info-wrapper">
        <div class="info">
          <callIcon class="info-icon" />
          <div class="info-text-wrapper">
            <p class="info-title">Emergency</p>
            <p class="info-text">(237) 681-812-255</p>
          </div>
        </div>
        <div class="info">
          <clockIcon class="info-icon" />
          <div class="info-text-wrapper">
            <p class="info-title">Work Hour</p>
            <p class="info-text">09:00 - 20:00 Everyday</p>
          </div>
        </div>
        <div class="info">
          <locationIcon class="info-icon" />
          <div class="info-text-wrapper">
            <p class="info-title">Location</p>
            <p class="info-text">0123 Some Place</p>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-wrapper">
      <div class="logo-wrapper-nav">
        <span class="logo-text"
          >Med<span class="logo-text-secondary">dical</span></span
        >
      </div>
      <div class="links-wrapper">
        <router-link
          v-for="(link, index) in headerLinks"
          :key="index"
          class="link"
          :exact="link.exact"
          :to="link.to"
          :class="{ 'link-active': isActive(link.to) }"
        >
          {{ link.label }}
        </router-link>
      </div>
      <div class="menu-icon" @click="isMenuOpen = !isMenuOpen">
        <component :is="isMenuOpen ? CloseIcon : BurgerMenuIcon" />
      </div>
      <div class="nav-menu" :class="{ open: isMenuOpen }">
        <router-link
          v-for="(link, index) in headerLinks"
          :key="index"
          class="link"
          :exact="link.exact"
          :to="link.to"
          :class="{ 'link-active': isActive(link.to) }"
          @click="isMenuOpen = !isMenuOpen"
        >
          {{ link.label }}
        </router-link>
        <button class="nav-button" @click="toSignIn">Sign In</button>
      </div>
      <button class="nav-button" @click="toSignIn">Sign In</button>
    </div>
  </header>
  <main>
    <router-view />
  </main>
  <footer class="footer">
    <div class="footer-wrapper">
      <div class="footer-container">
        <h2 class="footer-logo">Meddical</h2>
        <span class="footer-info"
          >Leading the Way in Medical <br />
          Execellence, Trusted Care.</span
        >
      </div>
      <div class="footer-container">
        <span class="footer-title">Important Links</span>
        <div class="footer-content-wrapper">
          <router-link
            v-for="(link, index) in footerLinks"
            :key="index"
            class="footer-text"
            :to="link.to"
          >
            {{ link.label }}
          </router-link>
        </div>
      </div>
      <div class="footer-container">
        <span class="footer-title">Contact Us</span>
        <div class="footer-content-wrapper">
          <span class="footer-text">Call: (237) 681-812-255</span>
          <span class="footer-text">Email: fildineesoe@gmail.com</span>
          <span class="footer-text">Address: 0123 Some place</span>
          <span class="footer-text">Some country</span>
        </div>
      </div>
    </div>
    <div class="divider-wrapper">
      <div class="divider"></div>
    </div>
    <div class="creditionals-wrapper">
      <span class="footer-title"
        >© 2021 Hospital’s name All Rights Reserved by PNTEC-LTD</span
      >
      <div class="social-wrapper">
        <linkedinIcon class="footer-icon"></linkedinIcon>
        <facebookIcon class="footer-icon"></facebookIcon>
        <instagramIcon class="footer-icon"></instagramIcon>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import callIcon from "../assets/icons/phone.svg";
import clockIcon from "../assets/icons/clock.svg";
import locationIcon from "../assets/icons/location.svg";
import linkedinIcon from "../assets/icons/linkdeIn.svg";
import facebookIcon from "../assets/icons/facebook.svg";
import instagramIcon from "../assets/icons/instagram.svg";
import BurgerMenuIcon from "../assets/icons/burger-menu.svg";
import CloseIcon from "../assets/icons/close.svg";
import router from "../router";
import { useRoute } from "vue-router";

const isMenuOpen = ref(false);
const route = useRoute();
const toSignIn = () => {
  router.push("/signIn");
  isMenuOpen.value = !isMenuOpen.value;
};
const isActive = (path) => {
  return route.path == path;
};
const headerLinks = ref([
  { label: "Home", to: "/", exact: true },
  { label: "About us", to: "/about" },
  { label: "Doctors", to: "/doctors" },
  { label: "Appointment", to: "/appointment" },
]);
const footerLinks = ref([
  { label: "Home", to: "/", exact: true },
  { label: "Appointment", to: "/appointment" },
  { label: "Doctors", to: "/doctors" },
  { label: "About us", to: "/about" },
]);
</script>

<style></style>
