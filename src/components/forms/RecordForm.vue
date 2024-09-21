<template>
  <div class="form-wrapper">
    <form class="form-holder">
      <div class="input-group">
        <input
          type="text"
          v-model="diagnosis"
          placeholder="Diagnosis"
          :class="{ 'input-error': errors.diagnosis }"
          class="base-input"
        />
        <span class="error" v-if="errors.diagnosis">{{
          errors.diagnosis
        }}</span>
      </div>
      <div class="input-group">
        <textarea
          placeholder="Description"
          class="base-textarea"
          v-model="description"
          :class="{ 'input-error': errors.description }"
        ></textarea>
        <span class="error" v-if="errors.description">{{
          errors.description
        }}</span>
      </div>
      <div class="input-group">
        <textarea
          placeholder="Treatment"
          class="base-textarea"
          v-model="treatment"
          :class="{ 'input-error': errors.treatment }"
        ></textarea>
        <span class="error" v-if="errors.treatment">{{
          errors.treatment
        }}</span>
      </div>
      <div class="input-group">
        <input
          type="file"
          @change="onFileChange"
          placeholder="tests"
          class="base-input"
        />
      </div>
      <button @click="addRecord" class="form-button">Record</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useAppointmentStore } from "@/store/appointment";

const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
});

const appointmentStore = useAppointmentStore();

const schema = yup.object({
  diagnosis: yup.string().required("Diagnosis is required"),
  description: yup.string().required("Description is required"),
  treatment: yup.string().required("Treatment is required"),
});

const { handleSubmit, values, defineField, errors } = useForm({
  validationSchema: schema,
  validateOnSubmit: true,
});
const imageSrc = ref(null);

const [diagnosis] = defineField("diagnosis", { validateOnModelUpdate: false });
const [description] = defineField("description", {
  validateOnModelUpdate: false,
});
const [treatment] = defineField("treatment", {
  validateOnModelUpdate: false,
});

const onFileChange = (event) => {
  const file = event.target.files[0];
  imageSrc.value = file;
};

const addRecord = handleSubmit((values) => {
  const userData = {
    patient: props.user.id,
    diagnosis: values.diagnosis,
    description: values.description,
    treatment: values.treatment,
    tests: imageSrc.value,
  };

  appointmentStore.createReccord(userData);
});
</script>

<style scoped></style>
