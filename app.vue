<script setup>
const description =
   "Tappd is an online ordering service for restaurants, bars, and cafes.";
const ogTitle = "Tappd";
const twitterDescription =
   "Tappd is an online ordering service for restaurants, bars, and cafes.";
const image =
   "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmVlcnxlbnwwfHwwfHx8MA%3D%3D";
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
      <NuxtLayout>
         <NuxtPage />
      </NuxtLayout>
   </div>
</template>

<style></style>
