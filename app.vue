<script setup>
const description
  = 'XXX'
const ogTitle
  = 'Lukas Olivier - Software Engineering Student'
const twitterDescription
  = 'XXX'
const image
  = 'XXX'
const mySite = 'XXX'
useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [{ rel: 'canonical', href: '' }],
  meta: [
    {
      name: 'description',
      content: description,
    },
    { property: 'og:site_name', content: mySite },
    { property: 'og:type', content: 'website' },
    {
      property: 'og:url',
      content: mySite,
    },
    {
      property: 'og:title',
      content: ogTitle,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: image,
    },
    // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
    { name: 'twitter:site', content: '@qdnvubp' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:url',
      content: mySite,
    },
    {
      name: 'twitter:title',
      content: ogTitle,
    },
    {
      name: 'twitter:description',
      content: twitterDescription,
    },
    {
      name: 'twitter:image',
      content: image,
    },
  ],
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
html.dark{
  color-scheme: dark;
}
</style>
