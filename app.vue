<script setup>
const layout = useState('layout', () => 'default');

const description =
   "Tappd is een innovatieve app voor het bestellen van drankjes.";
const ogTitle = "Tappd";
const twitterDescription =
   "Tappd is een innovatieve app voor het bestellen van drankjes.";
const image =
   "https://tappd-demo.lukasolivier.be/og-image.png";
const mySite = "https://tappd-demo.lukasolivier.be";

useHead({
   htmlAttrs: {
      lang: "nl",
   },
   link: [{ rel: "canonical", href: "https://tappd-demo.lukasolivier.be" }],
   meta: [
      {
         name: "description",
         content: description,
      },
      { property: "og:site_name", content: mySite },
      { property: "og:type", content: "website" },
      {
         property: "og:url",
         content: mySite,
      },
      {
         property: "og:title",
         content: ogTitle,
      },
      {
         property: "og:description",
         content: description,
      },
      {
         property: "og:image",
         content: image,
      },
      // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
      { name: "twitter:site", content: "@qdnvubp" },
      { name: "twitter:card", content: "summary_large_image" },
      {
         name: "twitter:url",
         content: mySite,
      },
      {
         name: "twitter:title",
         content: ogTitle,
      },
      {
         name: "twitter:description",
         content: twitterDescription,
      },
      {
         name: "twitter:image",
         content: image,
      },
   ],
});
</script>

<template>
   <div>
      <NuxtLayout :name="layout">
         <NuxtPage />
      </NuxtLayout>
   </div>
</template>

<style></style>
