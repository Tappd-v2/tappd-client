import { useRuntimeConfig } from 'nuxt/app'
import { computed, ref } from 'vue'

export function useMenu() {
  const config = useRuntimeConfig()
  const items = ref([])
  const categories = ref([])
  const filteredItems = ref([])
  const menu = computed(() => {
    return categories.value
      .map((category) => {
        const products = filteredItems.value.filter(item => item.categoryId === category.id)
        return {
          ...category,
          products,
        }
      })
      .filter(category => category.products?.length > 0)
  })

  const filterItems = (search) => {
    filteredItems.value = items.value.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
  }

  const fetchData = async () => {
    await Promise.all([fetchItems(), fetchCategories()])
    filteredItems.value = items.value
  }

  const fetchItems = async () => {
    const response = await fetch(`${config.public.apiBaseUrl}/items`)
    items.value = await response.json()
  }

  const fetchCategories = async () => {
    const response = await fetch(`${config.public.apiBaseUrl}/categories`)
    categories.value = await response.json()
  }

  return {
    items,
    categories,
    menu,
    filterItems,
    fetchData
  }
}
