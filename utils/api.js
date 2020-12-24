/* eslint-disable */ 
var _this
export default function ({ app }, inject) {
  _this = app
  inject('ApiService', ApiService)
}
// api services for call api easily
const ApiService = {
  /*
   * Call api with query
   */
  query (resource, params) {
    return _this.$axios.$get(resource, params).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },
  /*
   * Call get method
   */
  get (resource, slug = '') {
    return _this.$axios.$get(`${resource}/${slug}`).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },
 /*
   * Call post method
   */
  post (resource, params) {
    return _this.$axios.$post(`${resource}`, params)
  },
 /*
   * Call put method with slug and param
   */
  update (resource, slug, params) {
    return _this.$axios.$put(`${resource}/${slug}`, params)
  },
 /*
   * Call put method with param
   */
  put (resource, params) {
    return _this.$axios.$put(`${resource}`, params)
  },
 /*
   * Call delete method
   */
  delete (resource) {
    return _this.$axios.$delete(resource).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  }
}

