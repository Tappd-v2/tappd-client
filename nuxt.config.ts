export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width,initial-scale=1',
    },
  },

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    'nuxt-primevue',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],

  runtimeConfig: {
    public: {
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
