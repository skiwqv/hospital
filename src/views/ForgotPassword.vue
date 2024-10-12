<template>
  <div class="login-wrapper">
    <div class="logo-wrapper">
      <span class="logo-text"
        >Med<span class="logo-text-secondary">dical</span></span
      >
    </div>
    <div class="form-wrapper">
      <div v-if="!isRequestSent">
        <div class="input-group">
          <input
            v-bind="emailAttrs"
            v-model="email"
            type="email"
            placeholder="Email"
            class="base-input"
            :class="{ 'input-error': errors.email }"
          />
          <span class="error" v-if="errors.email">{{ errors.email }}</span>
        </div>
        <button class="form-button" @click="sendRequest">Send Request</button>
      </div>

      <div v-else>
        <span class="success-message"
          >Check your email to reset your password.</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useAppStore } from "@/store/app";

const appStore = useAppStore();

const isRequestSent = ref(false);

const currentUser = computed(() => appStore.currentUser);

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const { handleSubmit, values, defineField, errors } = useForm({
  validationSchema: schema,
  validateOnSubmit: true,
});

const [email, emailAttrs] = defineField("email", {
  validateOnModelUpdate: false,
});

const sendRequest = handleSubmit(async () => {
  try {
    const userData = {
      email: values.email,
    };
    await appStore.changePasswordRequest(userData);
    isRequestSent.value = true;
  } catch (error) {
    console.error("Failed to send request", error);
  }
});

onMounted(() => {
  if (currentUser.value) {
    email.value = currentUser.value.email;
  }
});
</script>

<style></style>
