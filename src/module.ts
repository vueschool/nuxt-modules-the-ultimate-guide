import {
  defineNuxtModule,
  addPlugin,
  addPluginTemplate,
  createResolver,
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

    const clientPlugin = options.activateObserver
      ? `import { defineNuxtPlugin } from "#imports";

export default defineNuxtPlugin(async (nuxtApp) => {

const VueObserveVisibility = await import("vue3-observe-visibility").then(
(m) => m.default
);

nuxtApp.vueApp.use(VueObserveVisibility);

});`
      : `import { defineNuxtPlugin } from "#imports";

export default defineNuxtPlugin(async (nuxtApp) => {

nuxtApp.vueApp.directive("observe-visibility", {});

});`;

    addPluginTemplate({
      getContents: () => clientPlugin,
      filename: "observer.mjs",
      mode: "client",
      write: true,
      dst: resolve("./runtime/observer.ts"),
    });

    addPlugin({
      src: resolve("./runtime/observer-stub"),
      mode: "server",
    });
  },
});
