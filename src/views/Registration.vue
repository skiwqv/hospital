<template>
  <div class="registration-wrapper">
    <div class="tabs">
      <router-link class="tab" active-class="tab-active" to="/signUp/user"
        >User</router-link
      >
      <router-link class="tab" active-class="tab-active" to="/signUp/doctor"
        >Doctor</router-link
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style scoped></style>
