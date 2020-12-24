
export const state = () => ({
  Articels: [],
  editSelectedArticle: {},
  deleteSelectedArticle: {}

})
export const mutations = {
  setEditArticle: (state, article) => {
    state.editSelectedArticle = article
  },
  setDeleteArticle: (state, article) => {
    state.deleteSelectedArticle = article
  }

}
export const getters = {
  getEditArticle: state => ({ item: state.editSelectedArticle, slug: state.editSelectedArticle.slug }),
  getDeleteArticle: state => ({ item: state.deleteSelectedArticle, slug: state.deleteSelectedArticle.slug })
}
