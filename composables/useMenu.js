import { useRuntimeConfig } from "nuxt/app";
import { computed, ref } from "vue";
import { useApi } from "./useApi";

export function useMenu() {
   const config = useRuntimeConfig();
   const items = ref([]);
   const categories = ref([]);
   const filteredItems = ref([]);
   const { apiGet } = useApi();
   const menu = computed(() => {
      return categories.value.map((category) => ({
         name: category.name,
         items: filteredItems.value.filter(
            (item) => item.categoryId === category.id,
         ),
      }));
   });

   const filterItems = (search) => {
      filteredItems.value = items.value.filter((item) =>
         item.name.toLowerCase().includes(search.toLowerCase()),
      );
   };

   const fetchData = async (locationId) => {
      await fetchCategories(locationId);
      await fetchItems(categories.value);
   };

   const fetchItems = async (categories) => {
      const allItems = await Promise.all(
         categories.map(async (category) => {
            const response = await apiGet(`items?categoryId=${category.id}`);
            return response;
         }),
      );
      items.value = allItems.flat(); // Flatten the array of arrays
      filteredItems.value = items.value;
   };

   const fetchCategories = async (locationId) => {
      const response = await fetch(
         `${config.public.apiBaseUrl}/${locationId}/categories`,
      );
      categories.value = await response.json();
   };

   return {
      items,
      categories,
      menu,
      filterItems,
      fetchData,
   };
}
