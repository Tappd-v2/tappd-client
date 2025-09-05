import { defineStore } from "pinia";
import { useApi } from "../composables/useApi";
export const useUserStore = defineStore("user", {
   state: () => {
      return {
         user: null,
         permissions: null,
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
         if (response && response.unauthorized) {
            this.user = null;
            this.permissions = null;
            return;
         }
         if (response) {
            this.user = response.user;
            this.permissions = response.permissions;
         }
         console.log(this.user);
         console.log(this.permissions);
      },
      logout() {
         this.user = null;
      },
   },
   persist: false,
});
