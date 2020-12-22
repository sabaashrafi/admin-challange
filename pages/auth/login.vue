<template>
  <div class="login-box p-3 pt-4">
    <h1 class="warm-grey text-center mb-4">
      {{ $t('auth.login.title') }}
    </h1>
    <b-form @submit.stop.prevent="onSubmit" @keydown.enter="onSubmit">
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
      <b-form-group :label="$t('auth.passwordInput')">
        <b-form-input
          v-model="$v.form.password.$model"
          name="password"
          type="password"
          :state="validateState('password')"
        />
        <div v-if="submitted && $v.form.password.$error" class="invalid-feedback">
          <span v-if="!$v.form.password.required">{{ $t('auth.validation.require') }}</span>
        </div>
      </b-form-group>

      <BaseButton :loading="buttonLoading" block :native-type="'submit'" :variant="'primary'">
        {{ $t('auth.login.button') }}
      </BaseButton>
    </b-form>
    <p class="mt-2">
      {{ $t('auth.login.haveAccount') }} <nuxt-link to="/register">
        {{ $t('auth.login.register') }}
      </nuxt-link>
    </p>
  </div>
</template>
<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

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
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(8)

      },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    async onSubmit () {
      this.submitted = true
      this.$v.form.$touch()
      this.buttonLoading = true
      if (this.$v.form.$anyError) {
        return
      }
      try {
        const response = await this.$auth.loginWith('local', {
          data:
   {
     user: { ...this.form }
   }
        })
        if (response) {
          console.log(response.data.user.token)
          this.buttonLoading = false

          this.$auth.setUserToken(response.data.user.token)
          this.$router.push('/')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss">
.login-box{
  background-color:$bg-gray;
}
</style>
