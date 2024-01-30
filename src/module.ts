import { defineNuxtModule, createResolver, addComponentsDir } from "@nuxt/kit";

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

    // addComponent({
    //   name: "CardColored",
    //   filePath: resolve("./runtime/cards/colored.vue"),
    //   export: "default",
    //   chunkName: "",
    //   prefetch: false,
    //   preload: false,
    //   global: false,
    //   mode: "all",
    //   priority: 1,
    //   island: true,
    // });

    addComponentsDir({
      path: resolve("./runtime/cards"),
      prefix: "Card",
      ignore: ["**/*.stories.js"],
      isAsync: true,
      extendComponent: (component) => {
        if (component.pascalName === "CardColored") component.prefetch = true;
        console.log(component);
        return component;
      },
      global: true,
      watch: true,
    });
  },
});
