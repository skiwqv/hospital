import router from "@/router";
import pinia from "@/store";
import "vue-toast-notification/dist/theme-bootstrap.css";
export function registerPlugins(app) {
  app.use(router);
  app.use(pinia);
}
