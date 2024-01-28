import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "my-module",
    configKey: "myModule",
  },

  defaults: {},
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    addPlugin({
      src: resolve("./runtime/observer"),
      mode: "client",
    });
    addPlugin({
      src: resolve("./runtime/observer-stub"),
      mode: "server",
    });
  },
});
