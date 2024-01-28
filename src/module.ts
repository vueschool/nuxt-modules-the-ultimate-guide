import { defineNuxtModule } from "@nuxt/kit";
import { defu } from "defu";

// Module options TypeScript interface definition
export interface ModuleOptions {
  dropConsole: boolean;
  nitroCompressAssets: boolean;
  nitroMinify: boolean;
  disableDeepUseAsyncData: boolean;
  manualChunks: {
    [key: string]: string[];
  };
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
    manualChunks: {},
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

    nuxt.hook("vite:extendConfig", (viteConfig, env) => {
      if (moduleOptions.dropConsole) {
        viteConfig.esbuild ||= {};
        viteConfig.esbuild.pure ||= [];
        viteConfig.esbuild.pure.push("console.log");
      }
    });

    nuxt.hook("nitro:config", (nitroConfig) => {
      if (moduleOptions.nitroCompressAssets)
        nitroConfig.compressPublicAssets = true;

      if (moduleOptions.nitroMinify) nitroConfig.minify = true;
    });

    nuxt.hook("vite:extendConfig", (config, { isClient }) => {
      const chunks = Object.entries(moduleOptions.manualChunks);
      if (!chunks.length || !isClient || process.env.NODE_ENV !== "production")
        return;

      // @ts-ignore
      config.build.rollupOptions.output.manualChunks = function (_id: string) {
        for (const [chunkName, chunkIds] of chunks) {
          for (const chunkId of chunkIds) {
            if (_id.includes(chunkId)) {
              return chunkName;
            }
          }
        }
      };
    });

    if (moduleOptions.disableDeepUseAsyncData)
      nuxtOptions.experimental.defaults.useAsyncData.deep = false;
  },
});
