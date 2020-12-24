/* eslint-disable */ 
var _this
export default function ({ app }, inject) {
  _this = app
  inject('ApiService', ApiService)
}
const ApiService = {
  query (resource, params) {
    return _this.$axios.$get(resource, params).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },

  get (resource, slug = '') {
    return _this.$axios.$get(`${resource}/${slug}`).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },

  post (resource, params) {
    return _this.$axios.$post(`${resource}`, params)
  },

  update (resource, slug, params) {
    return _this.$axios.$put(`${resource}/${slug}`, params)
  },

  put (resource, params) {
    return _this.$axios.$put(`${resource}`, params)
  },

  delete (resource) {
    return _this.$axios.$delete(resource).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  }
}

