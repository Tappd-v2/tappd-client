import Aura from "@primeuix/themes/aura";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
   devtools: { enabled: false },

   app: {
      head: {
         charset: "utf-16",
         viewport: "width=device-width,initial-scale=1",
         link: [
            {
               rel: "preload",
               href: "https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Staatliches&family=Lato:wght@700&display=swap",
               as: "style",
               onload: "this.onload=null;this.rel='stylesheet'",
            },
            {
               rel: "stylesheet",
               href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css",
            },
         ],
      },
   },

   vite: {
      plugins: [tailwindcss()],
   },

   modules: [
      "@nuxt/eslint",
      "@vueuse/nuxt",
      "@vueuse/motion/nuxt",
      "@primevue/nuxt-module",
      "@pinia/nuxt",
      "@pinia-plugin-persistedstate/nuxt",
   ],

   runtimeConfig: {
      public: {
         apiBaseUrl: process.env.API_BASE_URL,
         stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      },
      private: {
         kindeId: process.env.NUXT_KINDE_CLIENT_ID,
         kindeDomain: process.env.NUXT_KINDE_AUTH_DOMAIN,
         kindeRedirectUri: process.env.NUXT_KINDE_REDIRECT_URL,
      },
   },

   primevue: {
      importTheme: { from: "./assets/themes/tappd-theme.js" },
   },

   css: ["~/assets/css/tailwind.css"],

   piniaPersistedstate: {
      cookieOptions: {
         sameSite: "strict",
      },
      storage: "localStorage",
   },

   compatibilityDate: "2025-03-06",
});
