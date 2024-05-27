import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
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
     const response = await fetch('http://localhost:3030/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      this.user = await response.json();
      console.log(this.user);
    },
    logout() {
      this.user = null;
    },
  },
  persist: true,  // Enable persistence for this store
});
