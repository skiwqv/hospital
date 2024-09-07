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
          <callIcon />
          <div class="info-text-wrapper">
            <p class="info-title">Emergency</p>
            <p class="info-text">(237) 681-812-255</p>
          </div>
        </div>
        <div class="info">
          <clockIcon />
          <div class="info-text-wrapper">
            <p class="info-title">Work Hour</p>
            <p class="info-text">09:00 - 20:00 Everyday</p>
          </div>
        </div>
        <div class="info">
          <locationIcon />
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
import callIcon from "../assets/icons/phone.svg";
import clockIcon from "../assets/icons/clock.svg";
import locationIcon from "../assets/icons/location.svg";
</script>

<style></style>
