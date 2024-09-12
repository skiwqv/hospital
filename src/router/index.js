import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DafaultLayout.vue";
import { getTokenFromCookies } from "../helpers/Cookies";
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
        meta: { requiresGuest: true },
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
        meta: { requiresGuest: true },
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
      {
        path: "/profile",
        name: "Profile",
        component: () => import("../views/Profile.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("../layouts/AdminLayout.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: "",
        name: "HomeAdmin",
        component: () => import("../views/admin/HomeAdmin.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = getTokenFromCookies("access");
  const appStore = useAppStore();
  let currentUser = appStore.currentUser;

  if (to.meta.requiresAuth && !token) {
    return next({ name: "SignIn" });
  }

  if (to.meta.requiresGuest && token) {
    return next({ name: "Home" });
  }

  if (!currentUser && token) {
    try {
      currentUser = await appStore.getUserData();
    } catch (error) {
      return next({ name: "SignIn" });
    }
  }

  if (to.meta.requiresAdmin && currentUser.role !== "admin") {
    return next({ name: "Home" });
  }

  next();
});

export default router;
