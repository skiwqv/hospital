<template>
  <div class="home-wrapper">
    <div class="images-wrapper">
      <div class="banner">
        <img class="image" src="../assets/images/home.png" alt="" />
        <div class="banner-holder">
          <div class="banner-text">
            <span class="subtitle-home">Caring for Life</span>
            <h1 class="home-title">
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
      <span class="welcome-text">Welcome to Meddical</span>
      <h2 class="welcome-title">A Great Place to Receive Care</h2>
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
  </div>
</template>

<script setup>
import callendar from "../components/icons/callendar.vue";
import users from "../components/icons/users.vue";
import cash from "../components/icons/cash.vue";
</script>

<style></style>
