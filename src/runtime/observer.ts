import { defineNuxtPlugin } from "#imports";
import VueObserveVisibility from "vue3-observe-visibility";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueObserveVisibility, {});
});
