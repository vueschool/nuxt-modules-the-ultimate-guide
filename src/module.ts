import { defineNuxtModule, createResolver, addServerHandler } from "@nuxt/kit";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "my-module",
    configKey: "myModule",
  },

  defaults: {
    activateObserver: true,
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    addServerHandler({
      handler: resolve("./runtime/server/middleware/authMiddleware.ts"),
      route: "/test",
    });
  },
});
