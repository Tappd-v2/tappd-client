import { computed, ref } from 'vue'

export function useMenu() {
  const items = ref([])
  const categories = ref([])
  const filteredItems = ref([])
  const menu = computed(() => {
    return categories.value
      .map((category) => {
        const products = filteredItems.value.filter(item => item.category === category.id)
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

  // mock the fetches with hardcoded data
  const fetchCategories = async () => {
    categories.value = [
      { id: 1, name: 'Beers' },
      { id: 2, name: 'Wines' },
      { id: 3, name: 'Cocktails' },
      { id: 4, name: 'Soft Drinks' },
      { id: 5, name: 'Hot Drinks' },
    ]
  }

  const fetchItems = async () => {
    items.value = [
      // Beers
      { id: 1, name: 'Westmalle Tripel', description: 'Belgian tripel', price: 3.5, category: 1 },
      { id: 2, name: 'Duvel', description: 'Belgian strong pale ale', price: 4, category: 1 },
      { id: 3, name: 'Chimay Blue', description: 'Belgian strong dark ale', price: 5, category: 1 },
      // Wines
      { id: 4, name: 'Chardonnay', description: 'White wine', price: 4.5, category: 2 },
      { id: 5, name: 'Merlot', description: 'Red wine', price: 5, category: 2 },
      { id: 6, name: 'Rosé', description: 'Pink wine', price: 4, category : 2 },
      // Cocktails
      { id: 7, name: 'Mojito', description: 'Rum cocktail', price: 6, category: 3 },
      { id: 8, name: 'Negroni', description: 'Gin cocktail', price: 7, category: 3 },
      { id: 9, name: 'Margarita', description: 'Tequila cocktail', price: 8, category: 3 },
      // Soft Drinks
      { id: 10, name: 'Coca-Cola', description: 'Soft drink', price: 2, category: 4 },
      { id: 11, name: 'Fanta', description: 'Soft drink', price: 2, category: 4 },
      { id: 12, name: 'Sprite', description: 'Soft drink', price: 2, category: 4 },
      // Hot Drinks
      { id: 13, name: 'Espresso', description: 'Coffee', price: 2.5, category: 5 },
      { id: 14, name: 'Cappuccino', description: 'Coffee', price: 3, category: 5 },
      { id: 15, name: 'Tea', description: 'Hot drink', price: 2, category: 5 },
    ]
    filteredItems.value = items.value
  }

  return {
    items,
    categories,
    menu,
    fetchCategories,
    fetchItems,
    filterItems,
  }
}
