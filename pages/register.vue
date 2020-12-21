<template>
  <div class="login-box p-3 pt-4">
    <h1 class="warm-grey text-center mb-4">
      {{ $t('auth.Register.title') }}
    </h1>
    <b-form @submit.stop.prevent="onSubmit" @keydown.enter="onSubmit">
      <b-form-group :label="$t('auth.userInput')">
        <b-form-input
          v-model="$v.form.user.$model"
          name="user"
          :state="validateState('user')"
        />
        <div v-if="submitted && $v.form.user.$error" class="invalid-feedback">
          <span v-if="!$v.form.user.required">{{ $t('auth.validation.require') }}</span>
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

      <b-button block type="submit" variant="primary">
        {{ $t('auth.Register.button') }}
      </b-button>
    </b-form>
    <p class="mt-2">
      {{ $t('auth.Register.haveAccount') }} <strong @click="$router.push('/login')">{{ $t('auth.Register.login') }}</strong>
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
        user: null,
        email: null,
        password: null
      }
    }
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(4)
      },
      user: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    onSubmit () {
      this.submitted = true
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return
      }

      alert('Form submitted!')
    }
  }
}
</script>
<style lang="scss">
.login-box{
  background-color:$bg-gray;
}
</style>
