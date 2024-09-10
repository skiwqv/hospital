// Composables
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DafaultLayout.vue";
const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/signUp",
        name: "Sign Up",
        component: () => import("../views/Registration.vue"),
        redirect: "/signUp/user",
        children: [
          {
            path: "/signUp/user",
            name: "User Form",
            component: () => import("../components/forms/UserForm.vue"),
          },
          {
            path: "/signUp/doctor",
            name: "Doctor Form",
            component: () => import("../components/forms/DoctorForm.vue"),
          },
        ],
      },
      {
        path: "/signIn",
        name: "SignIn",
        component: () => import("../views/LogIn.vue"),
      },
      {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue"),
      },
      {
        path: "/doctors",
        name: "Doctors",
        component: () => import("../views/Doctors.vue"),
      },
      {
        path: "/appointment",
        name: "Appointment",
        component: () => import("../views/Appointment.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
