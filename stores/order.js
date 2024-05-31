import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', {
  state: () => {
    return {
      items: [],
      selectedItem: null,
      table: null,
      remarks: '',
      location: null,
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
    updateItem( id, amount ) {
      console.log('updateItem', id, amount);
      const item = this.items.find(i => i.id === id);
      if (item) {
        item.amount = amount;
      }
    },
    clear() {
      this.items = [];
    },
    setSelectedItem(item) {
      this.selectedItem = item;
    },
    unsetSelectedItem() {
      this.selectedItem = null;
    },
    setTable(table) {
      this.table = table;
    },
    setRemarks(remarks) {
      this.remarks = remarks;
    },
    setLocation(location) {
      if (location.id !== this.location?.id) {
        this.reset();
      }
      this.location = location;
    },
    reset() {
      this.items = [];
      this.selectedItem = null;
      this.table = null;
      this.remarks = '';
      this.location = null;
    }
  },
  persist: true,  // Enable persistence for this store
});
