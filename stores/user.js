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
   },
   actions: {
      async login(credentials) {
         const { apiPost } = useApi();
         this.user = await apiPost("users/login", credentials);
      },
      logout() {
         this.user = null;
      },
   },
   persist: true, // Enable persistence for this store
});
