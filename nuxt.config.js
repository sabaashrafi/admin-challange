export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'admin-challenge',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'article',
        path: '/article',
        component: resolve(__dirname, 'pages/article/page/_id.vue')
      })
    }

  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/scss/main.scss'],
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/mixins/index',
  // add globally component
    '~/plugins/globallyComponents',
    '~/utils/api', '~/services/article.services', '~/services/tags.services'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://i18n.nuxtjs.org/
    'nuxt-i18n',
    '@nuxtjs/auth',
    '@nuxtjs/style-resources'

  ],
  /**
   * moment config
   */

  /**
   * i18n config
   */
  i18n: {
    lazy: true,
    langDir: 'locales/',
    locales: [
      {
        name: 'English',
        code: 'en',
        iso: 'en',
        file: 'en'
      },
      {
        name: 'Farsi',
        code: 'fa',
        iso: 'fa',
        file: 'fa'
      }
    ],
    defaultLocale: 'en'
  },
  /*
   ** styleResources configuration
   */
  styleResources: {
    scss: ['./assets/scss/main.scss']
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_BASE_URL
  },
  /*
   ** Auth configuration
   */
  auth: {
    redirect: {
      login: '/login'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/users/login',
            method: 'post',
            propertyName: 'bearerToken'
          },
          user: { url: '/user', method: 'get', propertyName: false }
        }
      }
    }
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
