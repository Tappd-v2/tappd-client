<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useApi } from "~/composables/useApi";

const route = useRoute();
const { getLocationName } = useApi();
const title = ref("");

async function getTitle() {
   if (route.path === "/" || route.path === "/account") return "Tappd";
   return `Tappd - ${await getLocationName(route.params.location)}`;
}

onMounted(async () => {
   title.value = await getTitle();
});

const isVisible = ref(false);

const showSidebar = () => {
   isVisible.value = !isVisible.value;
};

const updateVisibility = (value) => {
   isVisible.value = value;
};

watchEffect(
   () => route.params.location,
   async () => {
      title.value = await getTitle();
   },
);
</script>

<template>
   <div class="hero">
      <MenuButton class="bg-transparent" @click="showSidebar" />
      <Menu class="z-20" />
      <div class="p-3">
         <div class="text-center">
            <h1 class="text-center text-5xl">{{ title }}</h1>
            <p class="text-xl">Eenvoudig Bestellen</p>
         </div>
      </div>
   </div>
</template>

<style scoped>
.hero {
   background-image: url("~/assets/images/hero.png");
   background-position: center;
   background-size: cover;
   color: white;
   padding: 1rem;
   font-family: "Staatliches", cursive;
}
</style>
