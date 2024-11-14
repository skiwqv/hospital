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
            v-if="isAppointment"
          >
            Add Record
          </button>
          <button
            class="update-button"
            @click="toChat(props.user.id)"
            title="Send message to patient"
            v-if="currentUser.roles == 'doctor'"
          >
            Send message
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
import { useAppStore } from "@/store/app";
import { useChatStore } from "@/store/chat";
import RecordForm from "@/components/forms/RecordForm.vue";
import router from "@/router";

const appointmentStore = useAppointmentStore();
const chatStore = useChatStore();
const appStore = useAppStore();

const props = defineProps({
  user: {
    type: Object,
    default: () => {},
    required: true,
  },
});

const currentUser = computed(() => appStore.currentUser);
const roomName = computed(() => chatStore.roomName);

const fullName = computed(() => {
  return `${props.user.first_name} ${props.user.last_name}`;
});

const isRecord = ref(false);
const isAppointment = ref(false);

const toChat = async (userID) => {
  await chatStore.checkRoom(userID);
  router.push({
    path: `/room/${roomName.value}`,
    query: {
      userId: userID,
    },
  });
};

onMounted(async () => {
  try {
    if (props.user && props.user.id) {
      const resp = await appointmentStore.isAppointment(props.user.id);
      if (resp && resp.status == 200) {
        isAppointment.value = true;
      } else {
        isAppointment.value = false;
      }
    } else {
      console.error("User or user ID is missing.");
    }
  } catch (error) {
    console.error("Error checking appointment:", error);
    isAppointment.value = false;
  }
});
</script>

<style></style>
