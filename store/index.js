
export const state = () => ({
  Articels: [],
  editSelectedArticle: {},
  deleteSelectedArticle: {}
})

export const mutations = {
  /*
  * set selected article for edit
  */
  setEditArticle: (state, article) => {
    state.editSelectedArticle = article
  },

  /*
  * set selected article for delete
  */
  setDeleteArticle: (state, article) => {
    state.deleteSelectedArticle = article
  }
}

export const getters = {
  // get article and slug seprated
  getEditArticle: state => ({ item: state.editSelectedArticle, slug: state.editSelectedArticle.slug }),

  // get article and slug seprated
  getDeleteArticle: state => ({ item: state.deleteSelectedArticle, slug: state.deleteSelectedArticle.slug })
}
