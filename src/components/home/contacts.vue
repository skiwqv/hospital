<template>
  <div class="contacts-wrapper">
    <span class="subtitle-base">Get in touch</span>
    <h2 class="title-base welcome-title">Contact</h2>
    <div class="contacts-holder">
      <div class="contact">
        <callIcon class="contact-icon" />
        <h6 class="contact-title">Emergency</h6>
        <span class="contact-text">(237) 681-812-255</span>
        <span class="contact-text">(237) 666-331-894</span>
      </div>
      <div class="contact">
        <locationIcon class="contact-icon" />
        <h6 class="contact-title">Location</h6>
        <span class="contact-text">0123 Some place</span>
        <span class="contact-text">9876 Some country</span>
      </div>
      <div class="contact">
        <emailIcon class="contact-icon" />
        <h6 class="contact-title">Email</h6>
        <span class="contact-text">fildineeesoe@gmil.com</span>
        <span class="contact-text">myebstudios@gmail.com</span>
      </div>
      <div class="contact">
        <clockIcon class="contact-icon" />
        <h6 class="contact-title">Working Hours</h6>
        <span class="contact-text">Mon-Sat 09:00-20:00</span>
        <span class="contact-text">Sunday Emergency only</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import callIcon from "../../assets/icons/phone.svg";
import clockIcon from "../../assets/icons/clock.svg";
import locationIcon from "../../assets/icons/location.svg";
import emailIcon from "../../assets/icons/email.svg";
</script>
