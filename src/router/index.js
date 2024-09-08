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
      },
      {
        path: "/signIn",
        name: "SignIn",
        component: () => import("../views/LogIn.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
