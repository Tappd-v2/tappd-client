import { defineStore } from "pinia";
import { useApi } from "../composables/useApi";
export const useUserStore = defineStore("user", {
   state: () => {
      return {
         user: null,
      };
   },
   getters: {
      isLoggedIn() {
         return !!this.user;
      },
      getUserInfo() {
         return this.user;
      },
   },
   actions: {
      async getCurrentUser() {
         const { apiGet } = useApi();
         const response = await apiGet("me");
         if (response) {
            this.user = response.user;
         }
      },
      logout() {
         this.user = null;
      },
   },
   persist: true, // Enable persistence for this store
});
