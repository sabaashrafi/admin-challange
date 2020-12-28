
export default {
  methods: {
    validateState (name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    popToast (variant, massage) {
      this.$root.$bvToast.toast(massage, {
        variant,
        autoHideDelay: 5000,
        noCloseButton: true
      })
    }
  }
}
