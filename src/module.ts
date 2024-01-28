import { defineNuxtModule } from "@nuxt/kit";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-basic-optimizer",
    configKey: "basicOptimizer",
  },

  defaults: {},
  setup(options, nuxt) {
    const nuxtOptions = nuxt.options;

    nuxtOptions.vite.esbuild ||= {};
    nuxtOptions.vite.esbuild.pure ||= [];
    nuxtOptions.vite.esbuild.pure.push("console.log");

    nuxtOptions.nitro.compressPublicAssets = true;

    nuxtOptions.nitro.minify = true;

    nuxtOptions.experimental.defaults.useAsyncData.deep = false;
  },
});
