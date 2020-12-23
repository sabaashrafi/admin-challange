<template>
  <div>
    <b-table show-empty :items="items" :fields="fields" :current-page="currentPage" :per-page="0" />
    <!-- <b-pagination v-model="currentPage" size="md" :total-rows="totalItems" :per-page="perPage" /> -->
    <b-pagination-nav v-model="currentPage" :link-gen="linkGen" :number-of-pages="10" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: [],
      fields: [

        {
          key: 'title',
          label: this.$t('articles.table')[0]
        },
        {
          key: 'author.username',
          label: this.$t('articles.table')[1]
        },
        {
          key: 'taglist',
          label: this.$t('articles.table')[2]
        },
        {
          key: 'body',
          label: this.$t('articles.table')[3]
        },
        {
          key: 'title',
          label: this.$t('articles.table')[4]
        }
      ],
      currentPage: 0,
      perPage: 10,
      totalItems: 0
    }
  },
  watch: {
    currentPage: {
      handler (value) {
        this.fetchData().catch((error) => {
          console.error(error)
        })
      }
    }
  },
  mounted () {
    this.fetchData().catch((error) => {
      console.error(error)
    })
  },
  methods: {
    async fetchData () {
      this.items = await fetch(`https://conduit.productionready.io/api/articles?offset=${this.currentPage * 10}&limit=10`)
        .then((res) => {
          this.totalItems = parseInt(res.headers.get('x-total-count'), 10)

          return res.json()
        })
        .then(items => items.articles)
    },
    linkGen (pageNum) {
      return pageNum === 1 ? { path: '/article' } : { path: `/article/page/${pageNum}` }
    }
  }
}
</script>
