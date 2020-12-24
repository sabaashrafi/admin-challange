<template>
  <div class="login-box p-3 pt-4">
    <h1 class="warm-grey text-center mb-4">
      {{ $t('auth.register.title') }}
    </h1>
    <b-form @submit.stop.prevent="register" @keydown.enter="register">
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
          <span v-if="!$v.form.password.minLength">{{ $t('auth.validation.minLength') }}</span>
        </div>
      </b-form-group>

      <BaseButton :loading="buttonLoading" block :native-type="'submit'" :variant="'primary'">
        {{ $t('auth.register.button') }}
      </BaseButton>
    </b-form>
    <p class="mt-2">
      {{ $t('auth.register.haveAccount') }} <strong @click="$router.push('/login')">{{ $t('auth.register.login') }}</strong>
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
      form: {
        username: null,
        email: null,
        password: null
      },
      buttonLoading: false
    }
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(8)
      },
      username: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    async register () {
      this.submitted = true
      this.buttonLoading = true
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return
      }
      try {
        await this.$axios.post('/users', {
          user: { ...this.form }
        }).then((response) => {
          this.$auth.setUser(response.data.user)
          this.$auth.setUserToken(response.data.user.token)
          this.$router.push('/article')
        }).finally(() => {
          this.buttonLoading = false
        })
      } catch (e) {
        this.buttonLoading = false

        console.log(e)
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
