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
      await fetchItems(); // Removed categories.value as it's not needed
   };

   const fetchItems = async () => {
      // Fetch all items for all categories in parallel
      const allItems = [];
      for (const category of categories.value) {
         const response = await apiGet(`items?categoryId=${category.id}`);
         allItems.push(...response); // Push items directly into allItems
      }

      // Update items.value and filteredItems.value reactively
      items.value.length = 0;
      items.value.push(...allItems);
      filteredItems.value.length = 0;
      filteredItems.value.push(...allItems);
   };

   const fetchCategories = async (locationId) => {
      const response = await fetch(
         `${config.public.apiBaseUrl}/${locationId}/categories`,
      );
      const data = await response.json();

      // Update categories.value reactively
      categories.value.length = 0;
      categories.value.push(...data);
   };

   return {
      items,
      categories,
      menu,
      filterItems,
      fetchData,
   };
}
