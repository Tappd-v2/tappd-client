<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <MainHeader />
    </header>
    <main class="bg-gray-100 flex-1">
      <slot />
    </main>
  </div>
</template>
