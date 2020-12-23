<template>
  <div>
    <h5>Posts</h5>
    <ul>
      <nuxt-link v-for="(item,index) in sideLinks" :key="index" :to="item.link" class="text-white">
        {{ item.name }}
      </nuxt-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      sideLinks: [
        { name: this.$t('sidebar.links.first'), link: '/article/page' },
        { name: this.$t('sidebar.links.second'), link: '/article/create' }
      ]
    }
  }
}
</script>
