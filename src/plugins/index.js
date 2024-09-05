// plugins/index.js

// Plugins
import router from "../router";

// Export a function to register plugins
export function registerPlugins(app) {
  app.use(router);
}
