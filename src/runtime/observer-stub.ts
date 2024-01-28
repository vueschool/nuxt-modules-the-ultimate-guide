import { defineNuxtPlugin } from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("observe-visibility", {});
});
