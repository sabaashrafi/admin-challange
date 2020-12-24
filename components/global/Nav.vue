<template>
  <div>
    <b-navbar toggleable="lg" class="bg-dark">
      <b-navbar-nav>
        <b-nav-item>
          <h4 class="text-white">{{ $t('navbar.title') }}</h4>
        </b-nav-item>
        <b-nav-item>
          <p class="text-white mb-0">
            {{ $t('navbar.welcome') }} {{ $store.state.auth.user.username }}
          </p>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#">
          <b-button variant="outline-primary" @click="logout">
            {{ $t('navbar.logout') }}
          </b-button>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class=" d-md-none d-block">
          <b-nav-item v-for="(item,index) in collaps" :key="index" href="#" :to="item.link">
            <p class="text-white mb-0">
              {{ item.name }}
            </p>
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
