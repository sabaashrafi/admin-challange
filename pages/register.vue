<template>
  <div class="login-box p-3 pt-4">
    <!-- title of page -->
    <h1 class="warm-grey text-center mb-4">
      {{ $t('auth.register.title') }}
    </h1>
    <!-- End title of page -->

    <!-- form for register -->
    <b-form @submit.stop.prevent="register" @keydown.enter="register">
      <!-- username form group with validation on  required -->

      <b-form-group :label="$t('auth.userInput')">
        <b-form-input
          v-model="$v.form.username.$model"
          name="username"
          :state="validateState('username')"
        />
        <div v-if="submitted && $v.form.username.$error" class="invalid-feedback">
          <span v-if="!$v.form.username.required">{{ $t('auth.validation.require') }}</span>
        </div>
      </b-form-group>
      <!-- End username form group -->

      <!-- email form group with validation on email adrress and required -->
      <b-form-group :label="$t('auth.emailInput')">
        <b-form-input
          v-model="$v.form.email.$model"
          name="email"
          type="email"
          :state="validateState('email')"
        />
        <div v-if="submitted && $v.form.email.$error" class="invalid-feedback">
          <span v-if="!$v.form.email.required">{{ $t('auth.validation.require') }}</span>
          <span v-if="!$v.form.email.email">{{ $t('auth.validation.email') }}</span>
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
        <div v-if="submitted && $v.form.password.$error" class="invalid-feedback">
          <span v-if="!$v.form.password.required">{{ $t('auth.validation.require') }}</span>
          <span v-if="!$v.form.password.minLength">{{ $t('auth.validation.minLength') }}</span>
        </div>
      </b-form-group>
      <!-- End password form group -->

      <!-- submit button -->
      <BaseButton :loading="buttonLoading" block :native-type="'submit'" :variant="'primary'">
        {{ $t('auth.register.button') }}
      </BaseButton>
    </b-form>
    <!-- End form -->

    <!-- text for switch to login page -->
    <p class="mt-2">
      {{ $t('auth.register.haveAccount') }} <nuxt-link class="text-dark font-weight-bold" to="/login">
        {{ $t("auth.register.login") }}
      </nuxt-link>
    </p>
    <!-- End text  -->
  </div>
</template>
<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
// Register page, login with username, email and password
export default {
  layout: 'authLayout',
  data () {
    return {
      submitted: false,
      form: {
        username: null,
        email: null,
        password: null
      },
      buttonLoading: false
    }
  },
  // @vuese
  // Validation on form for username, password and email
  validations: {
    form: {
      // password validation
      password: {
        required,
        minLength: minLength(8)
      },
      // username validation
      username: {
        required
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
  // Submit form for register
    async register () {
      this.submitted = true
      this.buttonLoading = true
      this.$v.form.$touch()
      // check validation
      if (this.$v.form.$anyError) {
        return
      }

      await this.$axios.post('/users', {
        user: { ...this.form }
      }).then((response) => {
      // set user and token manually
        this.$auth.setUserToken(response.data.user.token)
        this.$auth.setUser(response.data.user)

        // push to article page
        this.$router.push('/article')
      }).finally(() => {
        this.buttonLoading = false
      })
    }
  }
}
</script>
<style lang="scss">
.login-box{
  background-color:$bg-gray;
}
</style>
