import { defineNuxtModule } from "@nuxt/kit";
import { defu } from "defu";

export interface ModuleOptions {
  dropConsole: boolean;
  nitroCompressAssets: boolean;
  nitroMinify: boolean;
  disableDeepUseAsyncData: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-basic-optimizer",
    configKey: "basicOptimizer",
  },

  defaults: {
    dropConsole: true,
    nitroCompressAssets: true,
    nitroMinify: true,
    disableDeepUseAsyncData: true,
  },
  setup(options, nuxt) {
    const nuxtOptions = nuxt.options;

    nuxtOptions.runtimeConfig.public.basicOptimizer = defu(
      nuxtOptions.runtimeConfig.public.basicOptimizer || {},
      {
        ...options,
      }
    );

    if (options.dropConsole) {
      nuxtOptions.vite.esbuild ||= {};
      nuxtOptions.vite.esbuild.pure ||= [];
      nuxtOptions.vite.esbuild.pure.push("console.log");
    }

    if (options.nitroCompressAssets)
      nuxtOptions.nitro.compressPublicAssets = true;

    if (options.nitroMinify) nuxtOptions.nitro.minify = true;

    if (options.disableDeepUseAsyncData)
      nuxtOptions.experimental.defaults.useAsyncData.deep = false;
  },
});
