import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
   state: () => {
      return {
         items: [],
         selectedItem: null,
         table: null,
         remarks: "",
         location: null,
      };
   },
   getters: {
      itemCount() {
         return this.items.reduce((acc, item) => acc + item.amount, 0);
      },
      itemTotal() {
         const total = this.items.reduce(
            (acc, item) => acc + item.price * item.amount,
            0,
         );
         // round to 2 decimals and return as number
         return Number(total.toFixed(2));
      },
   },
   actions: {
      addItem(item) {
         const existingItem = this.items.find((i) => i.id === item.id);
         if (existingItem) {
            existingItem.amount += item.amount;
         } else {
            // ensure price is numeric and rounded to 2 decimals when stored
            const price =
               item.price !== undefined && item.price !== null
                  ? Number(Number(item.price).toFixed(2))
                  : 0;
            this.items.push({ ...item, price });
         }
      },
      removeItem(itemId) {
         this.items = this.items.filter((i) => i.id !== itemId);
      },
      updateItem(id, amount) {
         const item = this.items.find((i) => i.id === id);
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
      reset() {
         this.items = [];
         this.selectedItem = null;
         this.table = null;
         this.remarks = "";
      },
      setLocation(location) {
         const oldLocation = this.location;
         this.location = location;
         if (oldLocation && oldLocation.id !== location.id) {
            this.reset();
         }
      },
   },
   persist: true, // Enable persistence for this store
});
