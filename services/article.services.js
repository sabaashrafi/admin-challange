/* eslint-disable */ 
var _this

export default function ({ app }, inject) {
  _this = app
  inject('ArticlesService', ArticlesService)
}

 const ArticlesService = {
  query (type, params) {
    return _this.$ApiService.query('articles' + (type === 'feed' ? '/feed' : ''), {
      params
    })
  },
  get (slug) {
    console.log(_this)
    return _this.$ApiService.get('articles', slug)
  },
  create (params) {
    return _this.$ApiService.post('articles', { article: params })
  },
  update (slug, params) {
    return _this.$ApiService.update('articles', slug, { article: params })
  },
  destroy (slug) {
    return _this.$ApiService.delete(`articles/${slug}`)
  }
}
