<template>
  <form @submit.prevent class="form">
    <input placeholder="Name" type="text" class="base-input" />
    <div class="select-wrapper">
      <select name="gender" id="gender-select" class="base-input select">
        <option value="" disabled selected>Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="non-binary">Non-binary</option>
        <option value="prefer-not-to-say">Prefer not to say</option>
        <option value="other">Other</option>
      </select>
    </div>
    <input placeholder="Email" type="email" class="base-input" />
    <input placeholder="Phone" type="tel" class="base-input" />
    <div class="select-wrapper">
      <select name="date" id="date-select" class="base-input select">
        <option value="" disabled selected>Date</option>
        <option value="male">07.09</option>
        <option value="female">08.09</option>
        <option value="non-binary">10.09</option>
        <option value="prefer-not-to-say">21.09</option>
        <option value="other">27.09</option>
      </select>
    </div>
    <div class="select-wrapper">
      <select name="time" id="time-select" class="base-input select">
        <option value="" disabled selected>Time</option>
        <option value="male">12:00</option>
        <option value="female">13:00</option>
        <option value="non-binary">14:00</option>
        <option value="prefer-not-to-say">18:00</option>
      </select>
    </div>
    <div class="select-wrapper">
      <select name="doctor" id="doctor-select" class="base-input select">
        <option value="" disabled selected>Doctor</option>
        <option value="male">Semahina</option>
        <option value="female">Kyrila</option>
      </select>
    </div>
    <div class="select-wrapper">
      <select
        name="departament"
        id="departament-select"
        class="base-input select"
      >
        <option value="" disabled selected>Departament</option>
        <option value="male">MedBat</option>
        <option value="female">Chuguev</option>
      </select>
    </div>
    <textarea
      class="base-textarea"
      placeholder="Message"
      cols="30"
      rows="10"
    ></textarea>
    <button class="form-button">Subbmit</button>
  </form>
</template>

<script setup></script>

<style></style>
