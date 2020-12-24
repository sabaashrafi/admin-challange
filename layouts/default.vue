<template>
  <div>
    <header>
      <Nav />
    </header>
    <b-row>
      <b-col class="d-md-flex d-none" md="2">
        <Sidebar />
      </b-col>
      <b-col cols="12" md="10">
        <b-container> <Nuxt /></b-container>
      </b-col>
    </b-row>
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
