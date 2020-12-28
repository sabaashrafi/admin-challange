<template>
  <div class="login-box p-3 pt-4">
    <!-- title of page -->
    <h1 class="warm-grey text-center mb-4">
      {{ $t("auth.login.title") }}
    </h1>
    <!-- End title of page -->

    <!-- form for login -->
    <b-form @submit.stop.prevent="onSubmit" @keydown.enter="onSubmit">
      <!-- email form group with validation on email adrress and required -->
      <b-form-group :label="$t('auth.emailInput')">
        <b-form-input
          v-model="$v.form.email.$model"
          name="email"
          type="email"
          :state="validateState('email')"
        />
        <div v-if="submitted && $v.form.email.$error" class="invalid-feedback">
          <span v-if="!$v.form.email.required">{{
            $t("auth.validation.require")
          }}</span>
          <span v-if="!$v.form.email.email">{{
            $t("auth.validation.email")
          }}</span>
        </div>
      </b-form-group>
      <!-- End email form group -->

      <!-- password form group with validation on length  and required-->
      <b-form-group :label="$t('auth.passwordInput')">
        <b-form-input
          v-model="$v.form.password.$model"
          name="password"
          type="password"
          :state="validateState('password')"
        />
        <div
          v-if="submitted && $v.form.password.$error"
          class="invalid-feedback"
        >
          <span v-if="!$v.form.password.required">{{
            $t("auth.validation.require")
          }}</span>
        </div>
      </b-form-group>
      <!-- End password form group -->

      <!-- submit button -->
      <BaseButton
        :loading="buttonLoading"
        block
        :native-type="'submit'"
        :variant="'primary'"
      >
        {{ $t("auth.login.button") }}
      </BaseButton>
    </b-form>
    <!-- End form -->

    <!-- text for switch to register page -->
    <p class="mt-2">
      {{ $t("auth.login.haveAccount") }}
      <nuxt-link class="text-dark font-weight-bold" to="/register">
        {{ $t("auth.login.register") }}
      </nuxt-link>
    </p>
    <!-- End text  -->
  </div>
</template>
<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
// Login page, login with Email and password
export default {
  layout: 'authLayout',
  data () {
    return {
      submitted: false,
      buttonLoading: false,
      form: {
        email: null,
        password: null
      }
    }
  },
  // @vuese
  // Validation on form for password and email
  validations: {
    form: {
      // password validation
      password: {
        required,
        minLength: minLength(8)
      },
      // email validation
      email: {
        required,
        email
      }
    }
  },
  methods: {
  // @vuese
  // Submit form with login function on auth madule
    async onSubmit () {
      this.submitted = true
      this.$v.form.$touch()
      this.buttonLoading = true
      // Check validation
      if (this.$v.form.$anyError) {
        return
      }
      await this.$auth.loginWith('local', {
        data: {
          user: { ...this.form }
        }
      }).then((response) => {
        // Set user and token manually
        this.$auth.setUserToken(response.data.user.token)
        this.$auth.setUser(response.data.user)

        // Push to article page
        this.$router.push('/article')
      }).catch((error) => {
        this.popToast('danger', `Login Failed! ${Object.keys(error.response.data.errors)[0]} ${Object.values(error.response.data.errors)[0]}`)
      })
        .finally(() => {
          this.buttonLoading = false
        })
    }
  }
}
</script>
<style lang="scss">
.login-box {
  background-color: $bg-gray;
}
</style>
