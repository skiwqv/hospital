// Composables
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DafaultLayout.vue";
import { useAppStore } from "../store/app";

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
          {
            path: "/signUp/doctorProfile",
            name: "Doctor Profile",
            component: () =>
              import("../components/forms/DoctorProfileForm.vue"),
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
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Навигационный гвард
router.beforeEach((to, from, next) => {
  const appStore = useAppStore();
  const isAuthenticated = !!appStore.currentUser;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "SignIn" });
  } else {
    next();
  }
});

export default router;
