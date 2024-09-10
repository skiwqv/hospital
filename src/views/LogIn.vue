<template>
  <div class="login-wrapper">
    <div class="logo-wrapper">
      <span class="logo-text"
        >Med<span class="logo-text-secondary">dical</span></span
      >
    </div>
    <span class="subtitle-base">Welcome Back</span>
    <span class="login-info">Please enter your details to sign in.</span>
    <div class="form-wrapper">
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
      <div class="input-group">
        <input
          v-model="password"
          type="password"
          class="base-input"
          placeholder="Password"
          :class="{ 'input-error': errors.password }"
        />
        <span class="error" v-if="errors.password">{{ errors.password }}</span>
      </div>
      <button class="form-button" @click="signUp">Sign In</button>
      <span class="form-creditionals"
        >Don't have an account yet?
        <router-link to="/signUp" class="form-creditionals bold"
          >Sign Up</router-link
        ></span
      >
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useAppStore } from "../store/app";
import router from "../router";
const appStore = useAppStore();
import { getTokenFromCookies } from "../helpers/Cookies";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const { handleSubmit, values, defineField, errors } = useForm({
  validationSchema: schema,
  validateOnSubmit: true,
});

const [email, emailAttrs] = defineField("email", {
  validateOnModelUpdate: false,
});
const [password] = defineField("password", {
  validateOnModelUpdate: false,
});

const signUp = handleSubmit(async () => {
  const userData = {
    email: values.email,
    password: values.password,
  };
  await appStore.logInUser(userData);
  const token = getTokenFromCookies("access");
  if (token) {
    await appStore.getUserData();
  }
  router.push("/");
});
</script>

<style></style>
