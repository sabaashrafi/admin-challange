<template>
  <div>
    <header>
      <Nav />
    </header>
    <div class="d-flex">
      <b-col class="d-md-flex d-none px-0" md="2">
        <Sidebar />
      </b-col>
      <b-col cols="12" md="10">
        <b-container> <Nuxt /></b-container>
      </b-col>
    </div>
  </div>
</template>
<script>
import Nav from '@/components/global/Nav'
import Sidebar from '@/components/global/Sidebar'
export default {
  components: {
    Nav,
    Sidebar
  },
  middleware: ['auth']
}
</script>
<style>

</style>
