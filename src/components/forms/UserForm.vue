<template>
  <div class="bg-image">
    <div class="form-wrapper">
      <span class="title-base">Get Started!</span>
      <form class="form-holder">
        <div class="input-group">
          <input
            v-model="name"
            type="text"
            placeholder="Name"
            class="base-input"
            :class="{ 'input-error': errors.name }"
          />
          <span class="error" v-if="errors.name">{{ errors.name }}</span>
        </div>
        <div class="input-group">
          <input
            v-model="surname"
            type="text"
            placeholder="Surname"
            class="base-input"
            :class="{ 'input-error': errors.surname }"
          />
          <span class="error" v-if="errors.surname">{{ errors.surname }}</span>
        </div>
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
            v-model="phone"
            type="tel"
            placeholder="Phone"
            class="base-input"
            :class="{ 'input-error': errors.phone }"
          />
          <span class="error" v-if="errors.phone">{{ errors.phone }}</span>
        </div>
        <div class="input-group">
          <select
            v-model="gender"
            class="base-input"
            :class="{ 'input-error': errors.gender }"
          >
            <option :value="string" disabled selected>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
            <option value="other">Other</option>
          </select>
          <span class="error" v-if="errors.gender">{{ errors.gender }}</span>
        </div>
        <div class="input-group">
          <input
            v-model="bdate"
            type="date"
            class="base-input"
            :class="{ 'input-error': errors.bdate }"
          />
          <span class="error" v-if="errors.bdate">{{ errors.bdate }}</span>
        </div>
        <div class="input-group">
          <input
            v-model="password"
            type="password"
            class="base-input"
            placeholder="Password"
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
import { useAppStore } from "@/store/app";
import * as yup from "yup";

const appStore = useAppStore();

const schema = yup.object({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  gender: yup.string().required("Gender is required"),
  bdate: yup.date().required("Birthday date is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const { handleSubmit, values, defineField, errors } = useForm({
  validationSchema: schema,
  validateOnSubmit: true,
});

const [name] = defineField("name", { validateOnModelUpdate: false });
const [surname] = defineField("surname", { validateOnModelUpdate: false });
const [email] = defineField("email", {
  validateOnModelUpdate: false,
});
const [phone] = defineField("phone", { validateOnModelUpdate: false });
const [gender] = defineField("gender", { validateOnModelUpdate: false });
const [bdate] = defineField("bdate", { validateOnModelUpdate: false });
const [password] = defineField("password", { validateOnModelUpdate: false });
const [confirmPassword] = defineField("confirmPassword", {
  validateOnModelUpdate: false,
});

const signIn = handleSubmit(async (values) => {
  try {
    const userData = {
      first_name: values.name,
      last_name: values.surname,
      email: values.email,
      phone: values.phone,
      gender: values.gender,
      date_birth: values.bdate,
      password: values.password,
    };
    await appStore.registerUser(userData);
  } catch (error) {}
});
</script>

<style></style>
