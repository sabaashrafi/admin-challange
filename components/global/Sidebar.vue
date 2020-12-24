<template>
  <div class="sidebar">
    <h5 class="text-white my-3 ml-3 ">
      {{ $t("sidebar.title") }}
    </h5>
    <ul class="sidebar-links p-0">
      <nuxt-link
        v-for="(item, index) in sideLinks"
        :key="index"
        :to="item.link"
        class="text-white sidebar-link px-4 py-3"
      >
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
<style lang="scss">
.nuxt-link-exact-active {
 background-color: rgba(255, 255, 255, 0.15);
 }
.sidebar {
  background-color: $primary;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  &-links {
    display: flex;
    flex-direction: column;
  }
  &-link {
    padding-bottom: 2rem;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
