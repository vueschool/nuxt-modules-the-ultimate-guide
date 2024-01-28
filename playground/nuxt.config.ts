export default defineNuxtConfig({
  modules: ["../src/module"],
  basicOptimizer: {
    manualChunks: {
      rootComponents: ["nuxt-error-page.vue", "nuxt-root.vue"],
    },
  },
  devtools: { enabled: true },
});
