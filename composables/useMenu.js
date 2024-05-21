import { computed, ref } from 'vue'

export function useMenu() {
  const items = ref([])
  const categories = ref([])
  const filteredItems = ref([])
  const menu = computed(() => {
    return categories.value
      .map((category) => {
        const products = filteredItems.value.filter(item => item.category_id === category.id)
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
    const response = await fetch('/api/menu')
    const data = await response.json()
    items.value = data.items
    filteredItems.value = data.items
    categories.value = data.categories
  }

  return {
    items,
    categories,
    menu,
    filterItems,
    fetchData
  }
}
