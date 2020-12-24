/* eslint-disable */
var _this;

export default function({ app }, inject) {
  _this = app;
  inject("ArticlesService", ArticlesService);
}

const ArticlesService = {
  /*
   * Get articles with query params
   */
  query(params) {
    return _this.$ApiService.query("articles", {
      params
    });
  },
  /*
   * Get an article with slug
   */
  get(slug) {
    return _this.$ApiService.get("articles", slug);
  },
  /*
   * Create new article
   */
  create(params) {
    return _this.$ApiService.post("articles", { article: params });
  },
  /*
   * Edit an article
   */
  update(slug, params) {
    return _this.$ApiService.update("articles", slug, { article: params });
  },
  /*
   * Delete an article
   */
  destroy(slug) {
    return _this.$ApiService.delete(`articles/${slug}`);
  }
};
