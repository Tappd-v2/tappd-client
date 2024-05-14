<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <MainHeader />
    </header>
    <main class="h-full pb-20 bg-gray-100">
      <slot />
    </main>
    <footer>
      <MainFooter />
    </footer>
  </div>
</template>
