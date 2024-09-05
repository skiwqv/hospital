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
          <call-icon />
          <div class="info-text-wrapper">
            <p class="info-title">Emergency</p>
            <p class="info-text">(237) 681-812-255</p>
          </div>
        </div>
        <div class="info">
          <clock-icon />
          <div class="info-text-wrapper">
            <p class="info-title">Work Hour</p>
            <p class="info-text">09:00 - 20:00 Everyday</p>
          </div>
        </div>
        <div class="info">
          <location-icon />
          <div class="info-text-wrapper">
            <p class="info-title">Location</p>
            <p class="info-text">0123 Some Place</p>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-wrapper">
      <div class="links-wrapper">
        <router-link class="link" to="/" exact active-class="link-active"
          >Home</router-link
        >
        <router-link class="link" to="/about" active-class="link-active"
          >About us</router-link
        >
        <router-link class="link" to="/about" active-class="link-active"
          >Services</router-link
        >
        <router-link class="link" to="/about" active-class="link-active"
          >Doctors</router-link
        >
        <router-link class="link" to="/about" active-class="link-active"
          >News</router-link
        >
        <router-link class="link" to="/about" active-class="link-active"
          >Contact</router-link
        >
      </div>
      <button class="nav-button">Appointment</button>
    </div>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script setup>
import callIcon from "../components/icons/call.vue";
import clockIcon from "../components/icons/clock.vue";
import locationIcon from "../components/icons/location.vue";
</script>

<style></style>
