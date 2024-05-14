<script>
export default {
  data() {
    return {
      scrolled: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.checkScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.checkScroll)
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    checkScroll() {
      this.scrolled = window.scrollY > 100
    },
  },
}
</script>

<template>
  <div
    v-if="scrolled"
    class="back-to-top bg-white px-4 fixed right-5 bottom-5 p-2 rounded-full cursor-pointer" @click="scrollToTop"
  >
    <i class="fas fa-arrow-up" />
  </div>
</template>
