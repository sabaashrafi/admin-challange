<template>
  <div>
    <b-table
      show-empty
      responsive
      :items="items"
      :busy="loading"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
    >
      <template #cell(index)="data">
        {{ ((data.index )+( (currentPage-1)*10))+ 1 }}
      </template>

      <template #cell(body)="data">
        {{ data.item.body.slice(0,20) + '...' }}
      </template>
      <template #cell(taglist)="data">
        <b-button v-for="(tag,index) in data.item.tagList" :key="index" size="sm">
          {{ tag }}
        </b-button>
      </template>
      <template #cell(createdAt)="data">
        {{ $moment(data.createdAt).format("MMM D YYYY") }}
        <b-dropdown variant="primary" text="...">
          <b-dropdown-item @click="editArticle(data)">
            {{ $t('articles.dropDown.edit') }}
          </b-dropdown-item>
          <b-dropdown-item @click="deleteArticle(data)">
            {{ $t('articles.dropDown.delete') }}
          </b-dropdown-item>
        </b-dropdown>
      </template>
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle" />
          <strong>{{ $t('articles.loading') }}</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>
<script>
export default {
  props: {
    items: Array,
    fields: Array,
    currentPage: Number,
    loading: Boolean,
    perPage: { type: Number, default: 0 }
  },
  methods: {
    deleteArticle (item) {
      this.$emit('deleteArticle', item)
    },
    editArticle (item) {
      this.$store.commit('setEditArticle', item.item)
      this.$router.push({ path: '/article/create', query: { slug: item.item.slug } })
    }
  }
}
</script>
<style lang="scss">

.btn-primary{
  background-color: $secondary !important;
  border-color: $secondary !important;
}
</style>
