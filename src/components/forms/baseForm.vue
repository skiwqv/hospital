<template>
  <div class="form-wrapper">
    <form class="form-holder">
      <div class="input-group">
        <select
          v-model="specialties"
          class="base-input"
          :class="{ 'input-error': errors.specialties }"
        >
          <option :value="string" disabled selected>Specialties</option>
          <option
            v-for="text in subRoles"
            :key="text.id"
            :value="text.sub_role"
          >
            {{ text.sub_role }}
          </option>
        </select>
        <span class="error" v-if="errors.specialties">{{
          errors.specialties
        }}</span>
      </div>
      <div class="input-group">
        <select
          v-model="doctor"
          @focus="getDoctor(specialties)"
          class="base-input"
          :class="{ 'input-error': errors.doctor }"
          :disabled="!specialties"
        >
          <option :value="doctor" disabled selected>Select Doctor</option>
          <option v-for="doc in doctors" :key="doc.id" :value="doc.id">
            {{ `${doc.first_name} ${doc.last_name}` }}
          </option>
        </select>
        <span class="error" v-if="errors.doctor">{{ errors.doctor }}</span>
      </div>
      <input
        v-model="date"
        type="date"
        class="base-input"
        :disabled="!doctor"
      />
      <div class="input-group">
        <select
          v-model="time"
          class="base-input"
          :class="{ 'input-error': errors.time }"
          :disabled="!date"
          @focus="getTime(doctor, date)"
        >
          <option :value="time" disabled selected>Select Time</option>
          <option
            v-for="time in workingTime"
            :key="time"
            :disabled="!time.is_available"
            :value="time.value"
          >
            {{ time.time }}
          </option>
        </select>
        <span class="error" v-if="errors.time">{{ errors.time }}</span>
      </div>
      <textarea
        class="base-textarea"
        placeholder="Your message"
        cols="30"
        rows="10"
        v-model="message"
        :disabled="!time"
      ></textarea>
      <button @click="submitForm" class="form-button">Book Appointment</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useAppStore } from "@/store/app";
import { useAppointmentStore } from "@/store/appointment";
import router from "@/router/index";
import { useRoute } from "vue-router";
import { useToast } from "vue-toast-notification"; // Добавляем импорт тостов

const route = useRoute();
const $toast = useToast(); // Инициализируем тосты

const appStore = useAppStore();
const appointmentStore = useAppointmentStore();
const subRoles = computed(() => appStore.subRoles);
const doctors = computed(() => appointmentStore.doctors);
const workingTime = computed(() => appointmentStore.time);

const schema = yup.object({
  specialties: yup.string().required("Please select a specialty"),
  doctor: yup.string().required("Please select a doctor"),
  date: yup.string().required("Please select a date"),
  time: yup.string().required("Please select a time"),
  message: yup.string().optional(),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  validateOnSubmit: true,
});

const [specialties] = defineField("specialties", {
  validateOnModelUpdate: false,
});
const [doctor] = defineField("doctor", { validateOnModelUpdate: false });
const [date] = defineField("date", { validateOnModelUpdate: false });
const [time] = defineField("time", { validateOnModelUpdate: false });
const [message] = defineField("message", { validateOnModelUpdate: false });

const getDoctor = async (spec) => {
  await appointmentStore.getDoctors(spec);
};

const getTime = async (id, date) => {
  await appointmentStore.getTime(id, date);
};

const submitForm = handleSubmit((values) => {
  const userData = {
    doctor: values.doctor,
    date: values.date,
    time: values.time,
    message: values.message,
  };
  try {
    appointmentStore.makeAppointment(userData);
    $toast.success("Appointment booked successfully", {
      position: "bottom",
    });
    router.push("/profile");
  } catch (error) {
    $toast.error("Failed to book appointment", {
      position: "bottom",
    });
  }
});

// Используем route для получения данных из query

onMounted(() => {
  appStore.getSubRoles();

  // Если данные переданы через query, заполняем поля
  if (route.query.doctor && route.query.specialty) {
    specialties.value = route.query.specialty;
    doctor.value = route.query.doctor;

    // Загружаем список докторов для выбранной специализации
    getDoctor(route.query.specialty);
  }
});
</script>

<style></style>
