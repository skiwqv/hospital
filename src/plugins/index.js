import router from "@/router";
import pinia from "@/store";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
export function registerPlugins(app) {
  app.use(router);
  app.use(pinia);
}
