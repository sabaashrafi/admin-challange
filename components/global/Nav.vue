<template>
  <div>
    <b-navbar toggleable="lg" class="bg-dark" variant="info">
      <b-navbar-brand href="#" class="text-white">
        {{ $t('navbar.title') }}
      </b-navbar-brand>
      <b-navbar-nav class="mr-auto ml-1">
        <b-nav-item>
          <p class="text-white mb-0">
            {{ $store.state.auth.user.username }}
          </p>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto mr-1">
        <b-nav-item href="#">
          <b-button variant="outline-primary" @click="logout">
            {{ $t('navbar.logout') }}
          </b-button>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-for="(item,index) in sideLinks" :key="index" href="#" :to="item.link" class="text-white">
            {{ item.name }}
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      collaps: [
        { name: this.$t('sidebar.links.first'), link: '/article/page' },
        { name: this.$t('sidebar.links.second'), link: '/article/create' }
      ]
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>
