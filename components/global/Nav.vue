<template>
  <div>
    <b-navbar toggleable="lg" class="bg-dark">
      <b-navbar-nav>
        <b-navbar-brand>
          <h4 class="text-white">
            {{ $t('navbar.title') }}
          </h4>
        </b-navbar-brand>
        <b-nav-item>
          <p class="text-white mb-0 mt-1">
            {{ $t('navbar.welcome') }} <small>{{ $store.state.auth.user.username }}</small>
          </p>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse" />

      <!-- for md to down size -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class=" d-md-none d-block">
          <b-nav-item v-for="(item,index) in collaps" :key="index" href="#" :to="item.link">
            <p class="text-white mb-0">
              {{ item.name }}
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
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
// Navbar component
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
    // @vuese
    // logout
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>
