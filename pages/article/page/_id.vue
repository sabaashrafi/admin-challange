<template>
  <div>
    <BaseTable
      show-empty
      :loading="tableBusy"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="0"
      @deleteArticle="ShowdeleteModal($event)"
    />
    <b-pagination-nav v-model="currentPage" :link-gen="linkGen" :number-of-pages="10" />
    <BaseModal :show="modalShow" @close="modalShow=false">
      <template #header>
        <h5>
          {{ $t('delete.title') }}
        </h5>
      </template>
      <template>
        <p> {{ $t('delete.title') }}</p>
      </template>
      <template #footer>
        <b-button variant="light">
          {{ $t('no') }}
        </b-button>
        <b-button variant="danger" @click="deleteArticle">
          {{ $t('yes') }}
        </b-button>
      </template>
    </BaseModal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: [],
      tableBusy: false,
      fields: [
        {
          key: 'index',
          label: '#'
        },
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
          key: 'createdAt',
          label: this.$t('articles.table')[4]
        }
      ],
      currentPage: 0,
      perPage: 10,
      totalItems: 0,
      modalShow: false
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
      const filters = {
        offset: (this.currentPage - 1) * this.perPage,
        limit: this.perPage
      }
      const type = ''

      this.items = await this.$ArticlesService.query(type, filters).then(items => items.articles)
      this.tableBusy = false
    },
    linkGen (pageNum) {
      this.tableBusy = true

      return pageNum === 1 ? { path: '/article' } : { path: `/article/page/${pageNum}` }
    },
    ShowdeleteModal (item) {
      this.$store.commit('setDeleteArticle', item.item)
      this.modalShow = true
    },
    async deleteArticle (item) {
      const slug = this.$store.getters.getDeleteArticle.slug
      await this.$ArticlesService.destroy(slug).then(resp => console.log(resp))

      this.modalShow = false
    }
  }
}
</script>
