import { defineNuxtModule, createResolver } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "my-module",
    configKey: "myModule",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  hooks: {
    "nitro:config": (nitroConfig) => {
      const { resolve } = createResolver(import.meta.url);

      nitroConfig.publicAssets ||= [];
      nitroConfig.publicAssets.push({
        dir: resolve("./runtime/images"),
        maxAge: 60 * 60 * 24 * 365,
      });

      console.log(resolve("./runtime/images"));
    },
  },
  setup(moduleOptions, nuxt) {
    const links = [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,900&display=swap",
      },
    ];

    links.forEach((link) => {
      nuxt.options.app.head.link?.push(link);
    });

    const { resolve } = createResolver(import.meta.url);

    nuxt.options.css.push(resolve("./runtime/roboto.css"));
  },
});
