import {
  defineNuxtModule,
  createResolver,
  addServerHandler,
  addPrerenderRoutes,
  addServerImportsDir,
  addServerScanDir,
} from "@nuxt/kit";

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

    addPrerenderRoutes("/test");

    addServerImportsDir(resolve("./runtime/utils"));

    addServerScanDir(resolve("./runtime/server"));
  },
});
