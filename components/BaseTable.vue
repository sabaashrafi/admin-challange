<template>
  <div>
    <b-table
      show-empty
      :items="items"
      :busy="loading"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
    >
      <template #cell(index)="data">
        {{ ((data.index )+( (currentPage-1)*10))+ 1 }}
      </template>
      <template #cell(createdAt)="data">
        {{ $moment(data.createdAt).format("MMM D YYYY") }}
      </template>
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
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
  }
}
</script>
