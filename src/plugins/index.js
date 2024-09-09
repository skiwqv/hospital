// plugins/index.js

// Plugins
import router from "../router";
import pinia from "../store";
// Export a function to register plugins
export function registerPlugins(app) {
  app.use(router);
  app.use(pinia);
}
