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
      { id: 1, name: 'Westmalle Tripel', category: 1, price: 4.5 },
      { id: 2, name: 'Duvel', category: 1, price: 4.5 },
      { id: 3, name: 'Karmeliet Tripel', category: 1, price: 5 },
      { id: 4, name: 'Chimay Blue', category: 1, price: 5.5 },
      { id: 5, name: 'Orval', category: 1, price: 5.5 },
      { id: 6, name: 'La Chouffe', category: 1, price: 5.5 },
      { id: 7, name: 'St. Bernardus Abt 12', category: 1, price: 6 },
      { id: 8, name: 'Rochefort 10', category: 1, price: 6 },
      { id: 9, name: 'Westvleteren 12', category: 1, price: 7 },
      { id: 10, name: 'Bourgogne des Flandres', category: 1, price: 4.5 },
      { id: 11, name: 'Rodenbach', category: 1, price: 4.5 },
      { id: 12, name: 'Gouden Carolus Classic', category: 1, price: 5 },
      { id: 13, name: 'Kasteel Rouge', category: 1, price: 5 },
      { id: 14, name: 'Pauwel Kwak', category: 1, price: 5 },
      { id: 15, name: 'St. Feuillien Tripel', category: 1, price: 5 },
      { id: 16, name: 'Lindemans Kriek', category: 1, price: 4.5 },
      { id: 17, name: 'Lindemans Framboise', category: 1, price: 4.5 },
      { id: 18, name: 'Lindemans Pecheresse', category: 1, price: 4.5 },
      { id: 19, name: 'Lindemans Gueuze', category: 1, price: 4.5 },
      // Wines
      { id: 20, name: 'Chardonnay', category: 2, price: 4 },
      { id: 21, name: 'Sauvignon Blanc', category: 2, price: 4 },
      { id: 22, name: 'Pinot Grigio', category: 2, price: 4 },
      { id: 23, name: 'Merlot', category: 2, price: 4 },
      { id: 24, name: 'Cabernet Sauvignon', category: 2, price: 4 },
      { id: 25, name: 'Pinot Noir', category: 2, price: 4 },
      { id: 26, name: 'Malbec', category: 2, price: 4 },
      { id: 27, name: 'Shiraz', category: 2, price: 4 },
      { id: 28, name: 'Rosé', category: 2, price: 4 },
      // Cocktails
      { id: 29, name: 'Mojito', category: 3, price: 7 },
      { id: 30, name: 'Cosmopolitan', category: 3, price: 7 },
      { id: 31, name: 'Margarita', category: 3, price: 7 },
      { id: 32, name: 'Caipirinha', category: 3, price: 7 },
      { id: 33, name: 'Pina Colada', category: 3, price: 7 },
      // Soft Drinks
      { id: 34, name: 'Coca Cola', category: 4, price: 2 },
      { id: 35, name: 'Coca Cola Zero', category: 4, price: 2 },
      { id: 36, name: 'Fanta', category: 4, price: 2 },
      { id: 37, name: 'Sprite', category: 4, price: 2 },
      { id: 38, name: 'Tonic', category: 4, price: 2 },
      { id: 39, name: 'Soda', category: 4, price: 2 },
      { id: 40, name: 'Ginger Ale', category: 4, price: 2 },
      { id: 41, name: 'Ice Tea', category: 4, price: 2 },
      { id: 42, name: 'Red Bull', category: 4, price: 3 },
      { id: 43, name: 'Red Bull Sugarfree', category: 4, price: 3 },
      // Hot Drinks
      { id: 44, name: 'Espresso', category: 5, price: 2 },
      { id: 45, name: 'Espresso Macchiato', category: 5, price: 2 },
      { id: 46, name: 'Cappuccino', category: 5, price: 3 },
      { id: 47, name: 'Latte Macchiato', category: 5, price: 3 },
      { id: 48, name: 'Hot Chocolate', category: 5, price: 3 },
      { id: 49, name: 'Tea', category: 5, price: 2 },
      { id: 50, name: 'Chai Latte', category: 5, price: 3 },
      { id: 51, name: 'Irish Coffee', category: 5, price: 7 },
      { id: 52, name: 'French Coffee', category: 5, price: 7 },
      { id: 53, name: 'Italian Coffee', category: 5, price: 7 },
      { id: 54, name: 'Spanish Coffee', category: 5, price: 7 },
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
