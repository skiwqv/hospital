<template>
  <section class="appointments">
    <div>
      <Table
        title="Appointments History"
        v-if="currentUser.roles == 'doctor'"
        :data="appointments"
        :columns="[
          { label: 'Patient', key: 'patient_name', clickable: true },
          { label: 'Date', key: 'date' },
          { label: 'Time', key: 'time' },
          { label: 'Message', key: 'message' },
        ]"
        emptyMessage="There are no appointments yet"
        @viewProfile="toProfile"
      />
      <Table
        v-else
        title="Appointments History"
        :data="appointments"
        :columns="[
          { label: 'Doctor', key: 'doctor_name', clickable: true },
          { label: 'Date', key: 'date' },
          { label: 'Time', key: 'time' },
          { label: 'Message', key: 'message' },
        ]"
        emptyMessage="There are no appointments yet"
        @viewProfile="toDoctorProfile"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useAppStore } from "@/store/app";
import { useAppointmentStore } from "@/store/appointment";
import { sortDatesDescending } from "@/helpers/Formater";
import router from "@/router";
import Table from "@/components/tables/Table.vue";

const appStore = useAppStore();
const appointmentStore = useAppointmentStore();

const currentUser = computed(() => appStore.currentUser);
const appointments = computed(() => appointmentStore.allAppointments);

const toProfile = (data) => {
  let id = data.patient_id;
  router.push(`/profile-publick/${id}`);
};

const toDoctorProfile = (data) => {
  let id = data.doctor_id;
  router.push(`/profile-publick/${id}`);
};

watch(appointments, (newAppointments) => {
  if (newAppointments && newAppointments.length) {
    appointmentStore.appointments = sortDatesDescending(
      newAppointments,
      "date"
    );
  }
});

onMounted(async () => {
  await appointmentStore.getAllAppointments();
});
</script>
