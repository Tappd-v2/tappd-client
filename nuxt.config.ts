// https://nuxt.com/docs/api/configuration/nuxt-config
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

  modules: ['@vueuse/nuxt', '@nuxtjs/seo', 'nuxt-primevue'],

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
    'primevue/resources/themes/aura-light-blue/theme.css',
    'primeicons/primeicons.css',
    '~/assets/css/tailwind.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
