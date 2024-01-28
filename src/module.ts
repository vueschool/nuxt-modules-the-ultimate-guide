import { defineNuxtModule } from "@nuxt/kit";
import { defu } from "defu";

// Module options TypeScript interface definition
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
  // Default configuration options of the Nuxt module
  defaults: {
    dropConsole: true,
    nitroCompressAssets: true,
    nitroMinify: true,
    disableDeepUseAsyncData: true,
  },

  hooks: {},
  setup(options, nuxt) {
    const nuxtOptions = nuxt.options;

    const moduleOptions: ModuleOptions = defu(
      nuxtOptions.runtimeConfig.public.basicOptimizer || {},
      {
        ...options,
      }
    );

    nuxtOptions.runtimeConfig.public.basicOptimizer = moduleOptions;

    if (moduleOptions.dropConsole) {
      nuxt.hook("vite:extendConfig", (viteConfig, env) => {
        viteConfig.esbuild ||= {};
        viteConfig.esbuild.pure ||= [];
        viteConfig.esbuild.pure.push("console.log");
      });
    }

    nuxt.hook("nitro:config", (nitroConfig) => {
      if (moduleOptions.nitroCompressAssets)
        nitroConfig.compressPublicAssets = true;

      if (moduleOptions.nitroMinify) nitroConfig.minify = true;
    });

    if (moduleOptions.disableDeepUseAsyncData)
      nuxtOptions.experimental.defaults.useAsyncData.deep = false;
  },
});
