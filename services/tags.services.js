/* eslint-disable */

var _this;

export default function({ app }, inject) {
  _this = app;
  inject("TagsService", TagsService);
}
const TagsService = {
  /*
   * Get all tags
   */
  get() {
    return _this.$ApiService.get("tags");
  }
};
