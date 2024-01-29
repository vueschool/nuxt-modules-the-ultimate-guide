export default defineNuxtConfig({
  modules: [["../src/module", { activateObserver: false }]],

  devtools: { enabled: true },
});
