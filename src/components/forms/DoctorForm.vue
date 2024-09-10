<template>
  <div class="bg-image">
    <div class="form-wrapper">
      <form class="form-holder">
        <div class="input-group doctor">
          <input
            v-model="key"
            type="text"
            placeholder="ID Key"
            class="base-input"
            :class="{ 'input-error': errors.key }"
          />
          <span class="error" v-if="errors.key">{{ errors.key }}</span>
        </div>
        <button @click="signIn" class="form-button">Sign Up</button>
      </form>
      <span class="base-subtitle"
        >Already registered?
        <router-link class="form-link" to="/signIn">Sign In</router-link></span
      >
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import { useAppStore } from "../../store/app";
import * as yup from "yup";
const appStore = useAppStore();
const schema = yup.object({
  key: yup.string().required("Key is required"),
});

const { handleSubmit, values, defineField, errors } = useForm({
  validationSchema: schema,
  validateOnSubmit: true,
});

const [key] = defineField("key", { validateOnModelUpdate: false });

const signIn = handleSubmit(() => {
  const userData = {
    key: values.key,
  };
  appStore.logBack();
});
</script>
<style></style>
