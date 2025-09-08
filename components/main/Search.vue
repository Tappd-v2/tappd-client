<script setup>
import { ref } from "vue";

const search = ref("");

const emit = defineEmits(["search"]);

const onSearch = (e) => {
   emit("search", e.target.value);
};

const route = useRoute();

</script>

<template>
   <div class="flex w-11/12 mx-auto mt-10 justify-between flex-col">
      <IconField
         icon-position="left"
         unstyled
         class="flex-grow  flex  items-center rounded bg-white px-3 py-2"
      >
         <InputIcon class="pi pi-search mr-3 text-gray-500" />
         <InputText
            v-model="search"
            placeholder="Zoeken"
            unstyled
            class="flex-grow border-0 focus:outline-none"
            @input="onSearch"
         />
      </IconField>
       <!-- Call staff button -->
         <NuxtLink
            :to="`/venues/${route.params.location}/call`"
            aria-label="Vraag personeel om hulp"
            class="text-gray-500 hover:text-gray-700 flex items-center gap-2 mt-1 text-sm self-end underline"
         >
            Vraag personeel om hulp
         </NuxtLink>
      </div>
</template>
