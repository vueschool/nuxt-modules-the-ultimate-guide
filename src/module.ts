import {
  defineNuxtModule,
  createResolver,
  extendPages,
  extendRouteRules,
  addRouteMiddleware,
} from "@nuxt/kit";

export interface ModuleOptions {
  activateObserver: boolean;
}

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

    extendPages((pages) => {
      pages.push({
        name: "courses-pagination",
        file: resolve("./runtime/pages/pagination.vue"),
        path: "/courses/:page",
      });
    });

    extendRouteRules("/courses/**", { static: true });

    addRouteMiddleware({
      name: "redirector",
      path: resolve("runtime/redirector.ts"),
      global: true,
    });
  },
});
