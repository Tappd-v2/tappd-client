// nuxt.config.js
import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width,initial-scale=1',
      title: 'Tapdd',
      titleTemplate: 'Tapdd - %s',
      meta: [{ name: 'description', content: 'Tappd is an online ordering service for restaurants, bars, and cafes.' }],
    },
  },

  site: {
    url: 'https://example.com'
  },

  modules: ['@vueuse/nuxt', '@nuxtjs/seo', 'nuxt-primevue', '@pinia/nuxt',  '@pinia-plugin-persistedstate/nuxt'],

  runtimeConfig: {
    currencyKey: process.env.CURRENCY_API_KEY,
    public: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    },
  },

  primevue: {
    importPT: { from: '~/presets/lara' },
  },

  css: [
    'primevue/resources/themes/lara-light-blue/theme.css',
    'primeicons/primeicons.css',
    '~/assets/css/tailwind.css',
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
