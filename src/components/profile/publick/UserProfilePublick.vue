<template>
  <div class="profile-page">
    <div v-if="props.user && !isRecord">
      <div class="general">
        <div class="avatar-box">
          <div class="dropzone">
            <img class="avatar" :src="props.user.avatar" alt="" />
          </div>
          <h3 class="profile-name">{{ fullName }}</h3>
          <button
            class="update-button"
            title="Add recordf for patient"
            @click="isRecord = !isRecord"
          >
            Add Record
          </button>
        </div>
        <div class="info-box">
          <h4 class="info-title">General Information</h4>
          <div class="info">
            <div class="wrapper">
              <span class="info-title">First Name:</span>
              <span class="info-text">{{ props.user.first_name }}</span>
            </div>
            <div class="wrapper">
              <span class="info-title">Last Name:</span>
              <span class="info-text">{{ props.user.last_name }}</span>
            </div>
            <div class="wrapper">
              <span class="info-title">Gender:</span>
              <span class="info-text">{{ props.user.gender }}</span>
            </div>
          </div>
          <div class="info">
            <div class="wrapper">
              <span class="info-title">Phone:</span>
              <span class="info-text">{{ props.user.phone }}</span>
            </div>
            <div class="wrapper">
              <span class="info-title">Birthday:</span>
              <span class="info-text">{{ props.user.date_birth }}</span>
            </div>
            <div class="wrapper">
              <span class="info-title">Email:</span>
              <span class="info-text">{{ props.user.email }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isRecord" class="record-form-wrapper">
      <record-form :user="props.user"></record-form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAppointmentStore } from "@/store/appointment";
import RecordForm from "@/components/forms/RecordForm.vue";

const appointmentStore = useAppointmentStore();

const props = defineProps({
  user: {
    type: Object,
    default: () => {},
  },
});

const fullName = computed(() => {
  return `${props.user.first_name} ${props.user.last_name}`;
});

const isRecord = ref(false);
const isAppointment = ref(false);

onMounted(async () => {
  const resp = await appointmentStore.isAppointment(props.user.id);
  if (resp.status == "200") {
    isAppointment.value = true;
  } else {
    isAppointment.value = false;
  }
});
</script>

<style></style>
