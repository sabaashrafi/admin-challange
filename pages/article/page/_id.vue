<template>
  <div>
    <h1 class="my-3">
      {{ $t('articles.title') }}
    </h1>
    <!-- Table component -->
    <ArticleTable
      show-empty
      :loading="tableBusy"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="0"
      @deleteArticle="ShowdeleteModal($event)"
    />
    <!-- End table component -->

    <!-- Pagination of table -->
    <b-pagination-nav v-model="currentPage" align="center" :link-gen="linkGen" :number-of-pages="10" />
    <!-- End pagination of table -->

    <!-- Modal for delete article -->
    <BaseModal :show="modalShow" @close="modalShow=false">
      <!-- Header of modal -->
      <template #header>
        <h5>
          {{ $t('delete.title') }}
        </h5>
      </template>
      <!-- Text of modal -->
      <template>
        <p> {{ $t('delete.title') }}</p>
      </template>
      <!-- Footer buttons of modal -->
      <template #footer>
        <b-button variant="light" @click="modalShow=false">
          {{ $t('no') }}
        </b-button>
        <b-button variant="danger" @click="deleteArticle">
          {{ $t('yes') }}
        </b-button>
      </template>
    </BaseModal>
    <!-- End modal -->
  </div>
</template>
<script>
// Article table page
export default {
  data () {
    return {
      items: [],
      tableBusy: false,
      // Header of table
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
      currentPage: 1,
      perPage: 10,
      totalItems: 0,
      modalShow: false
    }
  },
  watch: {
    // @vuese
    // Watch current page to page with pagination
    currentPage: {
      handler (value) {
        this.getArticles()
      }
    }
  },
  mounted () {
    this.getArticles()
  },
  methods: {
    /**
   * @vuese
   * Get article with query
   */
    async getArticles () {
      const filters = {
        offset: (this.currentPage - 1) * this.perPage,
        limit: this.perPage
      }
      this.items = await this.$ArticlesService.query(filters).then(items => items.articles).finally(() => { this.tableBusy = false })
    },

    /**
     * @vuese
   * Route to other current page.(if page 1 : link to /article)
   * @arg PageNumber changed by pagination
   */
    linkGen (pageNum) {
      this.tableBusy = true
      return pageNum === 1 ? { path: '/article' } : { path: `/article/page/${pageNum}` }
    },

    /**
     * @vuese
   * Show modal and commit item selected
   * @arg Item that selected for deleting
   */
    ShowdeleteModal (item) {
      this.$store.commit('setDeleteArticle', item.item)
      this.modalShow = true
    },

    /**
     ** @vuese
   *  Delete item with its slug
   * @arg Item that selected for deleting
   */
    async deleteArticle (item) {
      const slug = this.$store.getters.getDeleteArticle.slug
      await this.$ArticlesService.destroy(slug).then(resp => console.log(resp))
      this.modalShow = false
    }
  }
}
</script>
