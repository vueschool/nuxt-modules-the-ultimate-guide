import { defineNuxtRouteMiddleware, navigateTo } from "#imports";

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path.includes("/old-courses-page")) return navigateTo("/courses/1");
});
