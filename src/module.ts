import {
  defineNuxtModule,
  addServerPlugin,
  createResolver,
  extendViteConfig,
  addVitePlugin,
} from "@nuxt/kit";
import svgLoader from "vite-svg-loader";
import { defu } from "defu";

export interface ModuleOptions {
  dropConsole: boolean;
  nitroCompressAssets: boolean;
  nitroMinify: boolean;
  disableDeepAsyncData: boolean;
  manualChunks: object;
  compressHtml: boolean;
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
    disableDeepAsyncData: true,
    manualChunks: {},
    compressHtml: false,
  },
  async setup(options, nuxt) {
    const nuxtOptions = nuxt.options;

    extendViteConfig((config) => {
      config.esbuild ||= {};
      config.esbuild.pure ||= [];
      config.esbuild.pure.push("console.log");
    });

    if (options.nitroCompressAssets)
      nuxtOptions.nitro.compressPublicAssets = true;

    if (options.nitroMinify) nuxtOptions.nitro.minify = true;

    if (options.disableDeepAsyncData)
      nuxtOptions.experimental.defaults.useAsyncData.deep = false;

    nuxtOptions.runtimeConfig.public.basicOptimizer = defu(
      nuxtOptions.runtimeConfig.public.basicOptimizer || {},
      {
        ...options,
      }
    );

    nuxt.hook("vite:extendConfig", (config, { isClient }) => {
      const chunks = Object.entries(options.manualChunks);

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
        return null;
      };
    });

    if (options.compressHtml && process.env.NODE_ENV === "production") {
      const { resolve } = createResolver(import.meta.url);
      addServerPlugin(resolve("runtime/compressor.ts"));
    }

    addVitePlugin(svgLoader());
  },
});
