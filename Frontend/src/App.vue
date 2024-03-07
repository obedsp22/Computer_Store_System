<script>
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Navigation,
    Footer
  }
}
</script>

<template>
  <Navigation></Navigation>

  <main style="margin: 0;">
    <router-view></router-view>
  </main>

  <Footer></Footer>
</template>

<style>
main {
  margin-bottom: 80px;
}
</style>