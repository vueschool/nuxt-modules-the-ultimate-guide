import {
  defineNuxtModule,
  createResolver,
  addImports,
  addImportsSources,
  addImportsDir,
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

    // addImports([
    //   {
    //     name: "renderToString",
    //     as: "renderToStr",
    //     from: "vue/server-renderer",
    //   },
    //   {
    //     name: "renderToNodeStream",
    //     as: "renderToNodeStream",
    //     from: "vue/server-renderer",
    //   },
    // ]);

    // addImportsSources({
    //   from: "vue/server-renderer",
    //   imports: ["renderToString", "renderToNodeStream"],
    // });

    addImportsDir(resolve("./runtime/composables"), {
      prepend: true,
    });
  },
});
