export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Staatliches&family=Lato:wght@700&display=swap', as: 'style', onload: "this.onload=null;this.rel='stylesheet'" },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'},
      ],
    },
  },

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    '@vueuse/motion/nuxt',
    'nuxt-primevue',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    },
  },

  primevue: {
    importPT: { from: '~/presets/lara' },
  },

  css: [
    '~/assets/css/tailwind.css',
    'primeicons/primeicons.css',
    'primevue/resources/themes/lara-light-blue/theme.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage'
  },
})
