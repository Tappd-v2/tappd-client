<template>
   <div>
      <p>This is private</p>
   </div>
</template>

<script setup>
definePageMeta({
   middleware: ["auth-logged-in"],
});
</script>
