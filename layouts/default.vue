<template>
  <div>
    <Nav />
    <b-sidebar />
    <Nuxt />
  </div>
</template>
<script>
import Nav from '@/components/global/Nav'
export default {
  components: {
    Nav
  },
  middleware: ['auth']
}
</script>
<style>

</style>
