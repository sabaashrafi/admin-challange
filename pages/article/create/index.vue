<template>
  <div>
    <h1 class="warm-grey text-center mb-4">
      {{ $t('create.title') }}
    </h1>
    <b-form @submit.stop.prevent="onSubmit" @keydown.enter="onSubmit">
      <b-row>
        <b-col md="9">
          <b-form-group :label="$t('create.inputs.title')">
            <b-form-input
              v-model="form.password"
              name="title"
            />
            <div v-if="submitted && $v.required.$error" class="invalid-feedback">
              <span v-if="!$v.required.required">{{ $t('auth.validation.require') }}</span>
            </div>
          </b-form-group>
          <b-form-group :label="$t('create.inputs.description')">
            <b-form-input
              v-model="form.password"
              name="description"
              :state="validateState('required')"
            />
            <div v-if="submitted && $v.required.$error" class="invalid-feedback">
              <span v-if="!$v.required.required">{{ $t('auth.validation.require') }}</span>
            </div>
          </b-form-group>
          <b-form-group :label="$t('create.inputs.')">
            <b-form-input
              v-model="form.password"
              name="password"
              type="password"
              :state="validateState('required')"
            />
            <div v-if="submitted && $v.required.$error" class="invalid-feedback">
              <span v-if="!$v.required.required">{{ $t('auth.validation.require') }}</span>
            </div>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group :label="$t('create.inputs')">
            <b-form-input
              v-model="form.password"
              name="password"
              type="password"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <BaseButton :loading="buttonLoading" :native-type="'submit'" :variant="'primary'">
        {{ $t('create.login.button') }}
      </BaseButton>
    </b-form>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      submitted: false,
      buttonLoading: false,
      form: {
        title: null,
        description: null,
        password: null
      }
    }
  },
  validations: {
    required: { required }
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
