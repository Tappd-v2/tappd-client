<template>
   <div class="min-h-screen bg-gray-100 text-gray-900">
      <!-- Hero Section -->
      <section class="relative overflow-hidden">
         <div class="relative z-10 px-6 py-20 text-center">
            <div class="mx-auto max-w-4xl">
               <h1
                  v-motion-pop-visible
                  class="staatliches mb-6 text-6xl leading-tight font-bold md:text-8xl"
               >
                  Tappd
               </h1>

               <h2
                  v-motion-slide-visible-bottom
                  :delay="200"
                  class="staatliches mb-8 text-2xl font-light md:text-3xl"
               >
                  Eenvoudig Bestellen
               </h2>

               <p
                  v-motion-slide-visible-bottom
                  :delay="400"
                  class="mb-12 text-lg leading-relaxed text-gray-600 md:text-xl"
               >
                  De innovatieve app voor het bestellen van drankjes in
                  restaurants, bars en cafés. Bestel gemakkelijk vanaf je tafel
                  en geniet van een naadloze ervaring.
               </p>

               <NuxtLink
                  v-motion-pop-visible
                  :delay="600"
                  to="/venues"
                  class="inline-flex items-center rounded-full bg-gray-900 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-gray-800 hover:shadow"
               >
                  <i class="fas fa-map-marker-alt mr-3"></i>
                  Bekijk Locaties
               </NuxtLink>
            </div>
         </div>
      </section>

      <!-- Features Section -->
      <section class="px-6 py-20">
         <div class="mx-auto max-w-6xl">
            <h3
               v-motion-slide-visible-bottom
               class="staatliches mb-16 text-center text-4xl font-bold text-gray-900"
            >
               Waarom Tappd?
            </h3>

            <div class="grid gap-8 md:grid-cols-3">
               <div
                  v-for="(feature, i) in features"
                  :key="feature.title"
                  v-motion-slide-visible-bottom
                  :delay="(i + 1) * 100"
                  class="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm"
               >
                  <div class="mb-6 flex justify-center">
                     <i :class="[feature.icon, 'text-5xl', feature.color]"></i>
                  </div>
                  <h4 class="mb-4 text-xl font-semibold">
                     {{ feature.title }}
                  </h4>
                  <p>
                     {{ feature.desc }}
                  </p>
               </div>
            </div>
         </div>
      </section>

      <!-- How it Works Section -->
      <section class="bg-gray-50 px-6 py-20">
         <div class="mx-auto max-w-4xl text-center">
            <h3
               v-motion-slide-visible-bottom
               class="staatliches mb-16 text-4xl font-bold text-gray-900"
            >
               Zo Werkt Het
            </h3>

            <div class="grid gap-8 md:grid-cols-3">
               <div
                  v-for="(step, i) in steps"
                  :key="step.title"
                  v-motion-slide-visible-bottom
                  :delay="(i + 1) * 100"
                  class="flex flex-col items-center"
               >
                  <div
                     class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-2xl font-bold text-white"
                  >
                     {{ i + 1 }}
                  </div>
                  <h4 class="mb-2 text-lg font-semibold">
                     {{ step.title }}
                  </h4>
                  <p>
                     {{ step.desc }}
                  </p>
               </div>
            </div>
         </div>
      </section>
   </div>
</template>

<script setup>
const features = [
   {
      title: "Eenvoudig Bestellen",
      desc: "Bestel direct vanaf je smartphone zonder te wachten op de bediening.",
      icon: "fas fa-mobile-alt",
      color: "text-gray-700",
   },
   {
      title: "Snelle Service",
      desc: "Verkort wachttijden en geniet sneller van je favoriete drankjes.",
      icon: "fas fa-clock",
      color: "text-gray-700",
   },
   {
      title: "Veilig Betalen",
      desc: "Betaal veilig online met verschillende betaalmethoden.",
      icon: "fas fa-credit-card",
      color: "text-gray-700",
   },
];

const steps = [
   { title: "Kies je Locatie", desc: "Selecteer je restaurant, bar of café" },
   { title: "Plaats je Bestelling", desc: "Kies je drankjes uit het menu" },
   { title: "Geniet!", desc: "Je bestelling wordt snel geserveerd" },
];

definePageMeta({
   layout: "landing",
});

useHead({
   title: "Over ons | Tappd - Eenvoudig Bestellen",
});
</script>

<style scoped>
.staatliches {
   font-family: "Staatliches", cursive;
}
</style>
