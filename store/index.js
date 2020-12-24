
export const state = () => ({
  Articels: [],
  selectedArticle: {}

})
export const mutations = {
  setSelectedArticle: (state, article) => {
    state.selectedArticle = article
  }

}
export const getters = {
  getSelectedArticle: state => ({ slug: state.selectedArticle.slug })
}
