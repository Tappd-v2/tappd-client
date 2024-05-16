import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', {
  state: () => {
    return {
      items: [],
    };
  },
  getters: {
    itemCount() {
      return this.items.reduce((acc, item) => acc + item.amount, 0);
    },
    itemTotal() {
      return this.items.reduce((acc, item) => acc + item.price * item.amount, 0);
    },
  },
  actions: {
    addItem(item) {
      const existingItem = this.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.amount += item.amount;
      } else {
        this.items.push({ ...item});
      }
    },
    removeItem(itemId) {
      this.items = this.items.filter(i => i.id !== itemId);
    },
    clear() {
      this.items = [];
    },
  },
  persist: true,  // Enable persistence for this store
});
