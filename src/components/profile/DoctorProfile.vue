<template>
  <div class="profile-page">
    <div class="general">
      <div class="avatar-box">
        <div class="dropzone">
          <img
            class="avatar"
            :src="
              imagePreview ||
              (currentUser.avatar ? currentUser.avatar : brendaPlaceholder)
            "
            alt=""
          />
          <input type="file" required hidden id="imge" @change="onFileChange" />
          <label for="imge" title="Upload your photo">
            <UploadIcon class="upload-icon"></UploadIcon>
          </label>
        </div>
        <h3 class="profile-name">{{ fullName }}</h3>
        <button
          class="update-button"
          title="Update your profile"
          @click="updateProfile"
        >
          Update
        </button>
      </div>
      <div class="info-box">
        <h4 class="info-title">General Information</h4>
        <div class="info">
          <div class="wrapper">
            <span class="info-title">First Name:</span>
            <input
              v-model="currentUser.first_name"
              type="text"
              class="info-input"
            />
          </div>
          <div class="wrapper">
            <span class="info-title">Last Name:</span>
            <input
              v-model="currentUser.last_name"
              type="text"
              class="info-input"
            />
          </div>
          <div class="wrapper">
            <span class="info-title">Speciality:</span>
            <input
              v-model="currentUser.sub_role"
              disabled
              type="text"
              class="info-input"
            />
          </div>
        </div>
        <div class="info">
          <div class="wrapper">
            <span class="info-title">Phone:</span>
            <input v-model="currentUser.phone" type="tel" class="info-input" />
          </div>
          <div class="wrapper">
            <span class="info-title">Birthday:</span>
            <input
              v-model="currentUser.date_birth"
              type="date"
              disabled
              class="info-input"
            />
          </div>
          <div class="wrapper">
            <span class="info-title">Email:</span>
            <input
              v-model="currentUser.email"
              type="email"
              class="info-input"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="appointments">
      <h2>Patients with Appointments</h2>
      <div class="appointments-table">
        <table class="table">
          <thead class="table-head">
            <tr>
              <th class="head-title">Patient</th>
              <th class="head-title">Date</th>
              <th class="head-title">Time</th>
              <th class="head-title">Message</th>
              <th class="head-title">Cancel</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(appointment, index) in appointments" :key="index">
              <td
                class="table-content link"
                title="Open patient profile"
                @click="toProfile(appointment.patient_id)"
              >
                {{ appointment.patient_name }}
              </td>
              <td class="table-content">{{ appointment.date }}</td>
              <td class="table-content">{{ appointment.time }}</td>
              <td class="table-content">{{ appointment.message }}</td>
              <td class="icon-wrapper" title="Delete Appointment">
                <DeleteIcon
                  class="delete-icon"
                  @click="cancelAppointment(index)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAppStore } from "@/store/app";
import { useAppointmentStore } from "@/store/appointment";
import { useToast } from "vue-toast-notification";
import UploadIcon from "@/assets/icons/upload.svg";
import DeleteIcon from "@/assets/icons/delete.svg";
import brendaPlaceholder from "@/assets/images/brenda.jpg";
import router from "@/router";

const appStore = useAppStore();
const appointmentStore = useAppointmentStore();
const $toast = useToast();
const currentUser = computed(() => appStore.currentUser);
const appointments = computed(() => appointmentStore.appointments);
const fullName = computed(() => {
  return `${currentUser.value.first_name} ${currentUser.value.last_name}`;
});

const imageSrc = ref(null);
const imagePreview = ref(null);

const onFileChange = (event) => {
  const file = event.target.files[0];
  imageSrc.value = file;
  imagePreview.value = URL.createObjectURL(file);
};

const updateProfile = () => {
  try {
    const user = {
      first_name: currentUser.value.first_name,
      last_name: currentUser.value.last_name,
      email: currentUser.value.email,
      avatar: imageSrc.value,
      phone: currentUser.value.phone,
    };
    appStore.updateProfile(user);
    $toast.success("Profile updated successfully", {
      position: "bottom",
    });
  } catch (error) {
    $toast.error("An error occurred while updating profile", {
      position: "bottom",
    });
  }
};

const cancelAppointment = (index) => {
  appointments.value.splice(index, 1);
  $toast.info("Appointment cancelled", {
    position: "bottom",
  });
};

const toProfile = (id) => {
  router.push(`/profile-publick/${id}`);
};

onMounted(async () => {
  appointmentStore.getAppointments();
});
</script>

<style></style>
