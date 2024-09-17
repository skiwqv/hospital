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
          v-for="(link, index) in navMenuLinks"
          :key="index"
          class="link"
          :exact="link.exact"
          :to="link.to"
          :class="{ 'link-active': isActive(link.to) }"
          @click="isMenuOpen = !isMenuOpen"
        >
          {{ link.label }}
        </router-link>
        <button v-if="!currentUser" class="nav-button" @click="toSignIn">
          Sign In
        </button>
        <button v-else class="nav-button" @click="logOut">Log Out</button>
      </div>
      <button v-if="!currentUser" class="nav-button" @click="toSignIn">
        Sign In
      </button>
      <div v-else class="user-wrapper">
        <div class="dropdown" @click="dropdownVisible = !dropdownVisible">
          <ProfileIcon class="user-icon"></ProfileIcon>
          <div v-if="dropdownVisible" class="dropdown-menu">
            <div class="items-wrapper">
              <span class="menu-item" @click="toProfile">
                <ProfileCardIcon class="menu-item-icon"></ProfileCardIcon>
                Profile</span
              >
              <span
                class="menu-item"
                @click="toAdmin"
                v-if="currentUser.role == 'admin'"
              >
                <AdminIcon class="menu-item-icon"></AdminIcon>
                Admin</span
              >
              <span class="menu-item" @click="logOut">
                <LogOutIcon class="logout-icon"></LogOutIcon>
                Log Out</span
              >
            </div>
          </div>
        </div>
      </div>
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
import { ref, computed } from "vue";
import callIcon from "@/assets/icons/phone.svg";
import clockIcon from "@/assets/icons/clock.svg";
import locationIcon from "@/assets/icons/location.svg";
import linkedinIcon from "@/assets/icons/linkdeIn.svg";
import facebookIcon from "@/assets/icons/facebook.svg";
import instagramIcon from "@/assets/icons/instagram.svg";
import BurgerMenuIcon from "@/assets/icons/burger-menu.svg";
import CloseIcon from "@/assets/icons/close.svg";
import ProfileIcon from "@/assets/icons/profile.svg";
import ProfileCardIcon from "@/assets/icons/profileCard.svg";
import LogOutIcon from "@/assets/icons/logout.svg";
import AdminIcon from "@/assets/icons/admin.svg";
import router from "@/router";
import { useRoute } from "vue-router";
import { useAppStore } from "@/store/app";
const appStore = useAppStore();

const currentUser = computed(() => appStore.currentUser);

const isMenuOpen = ref(false);
const dropdownVisible = ref(false);
const route = useRoute();

const toSignIn = () => {
  router.push("/signIn");
  isMenuOpen.value = !isMenuOpen.value;
};

const logOut = () => {
  appStore.logOut();
  isMenuOpen.value = !isMenuOpen.value;
  router.push("/");
};

const toProfile = () => {
  isMenuOpen.value = !isMenuOpen.value;
  router.push("/profile");
};

const toAdmin = () => {
  isMenuOpen.value = !isMenuOpen.value;
  router.push("/admin");
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
const navMenuLinks = ref([
  { label: "Home", to: "/", exact: true },
  { label: "About us", to: "/about" },
  { label: "Profile", to: "/profile" },
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
