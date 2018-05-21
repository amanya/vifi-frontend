<template>
  <div>
    <Navbar />
    <div class="section">
      <router-view />
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Foot from '@/components/Foot'
export default {
  name: 'App',
  components: {
    Navbar,
    Foot
  },
  created() {
    this.$store.dispatch('tryAutoLogin')
  }
}
</script>

<style>
</style>
