export default defineNuxtConfig({
  modules: ["../src/module"],
  basicOptimizer: {
    compressHtml: true,
  },
  devtools: { enabled: true },
});
