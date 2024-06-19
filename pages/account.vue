<template>
   <div class="flex w-full items-center justify-between p-4">
      <p>
         Welcome, {{ currentUser ? currentUser.user.name : "Not logged in" }}
      </p>
   </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const currentUser = userStore.user;

console.log(currentUser);
</script>
