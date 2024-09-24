<template>
  <div class="login-wrapper">
    <div class="logo-wrapper">
      <span class="logo-text">Change Password</span>
    </div>
    <div class="form-wrapper">
      <div>
        <div class="input-group">
          <input
            v-model="password"
            type="password"
            class="base-input"
            placeholder="New Password"
            :class="{ 'input-error': errors.password }"
          />
          <span class="error" v-if="errors.password">{{
            errors.password
          }}</span>
        </div>
        <div class="input-group">
          <input
            v-model="confirmPassword"
            type="password"
            class="base-input"
            placeholder="Confirm Password"
            :class="{ 'input-error': errors.confirmPassword }"
          />
          <span class="error" v-if="errors.confirmPassword">{{
            errors.confirmPassword
          }}</span>
        </div>
        <button class="form-button" @click="changePassword">
          Change Password
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useAppStore } from "@/store/app";
import { useRoute } from "vue-router";
import router from "../router";
const route = useRoute();
const appStore = useAppStore();

const schema = yup.object({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  validateOnSubmit: true,
});

const [password] = defineField("password", { validateOnModelUpdate: false });
const [confirmPassword] = defineField("confirmPassword", {
  validateOnModelUpdate: false,
});

const changePassword = handleSubmit(async (values) => {
  try {
    const userData = {
      new_password: values.password,
    };
    await appStore.updatePassword(userData, route.params.token);
    router.push("/signIn");
  } catch (error) {
    console.error("Error changing password", error);
  }
});
</script>

<style></style>
