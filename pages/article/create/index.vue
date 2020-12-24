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
              v-model="$v.form.title.$model"
              name="title"
              :state="validateState('title')"
            />
            <div v-if="submitted && $v.form.title.$error" class="invalid-feedback">
              <span v-if="!$v.form.title.required">{{ $t('auth.validation.require') }}</span>
            </div>
          </b-form-group>
          <b-form-group :label="$t('create.inputs.description')">
            <b-form-input
              v-model="$v.form.description.$model"
              name="description"
              :state="validateState('description')"
            />
            <div v-if="submitted && $v.form.description.$error" class="invalid-feedback">
              <span v-if="!$v.form.description.required">{{ $t('auth.validation.require') }}</span>
            </div>
          </b-form-group>
          <b-form-group :label="$t('create.inputs.body')">
            <b-form-textarea
              v-model="$v.form.body.$model"
              name="body"
              rows="8"
              :state="validateState('body')"
            />
            <div v-if="submitted && $v.form.body.$error" class="invalid-feedback">
              <span v-if="!$v.form.body.required">{{ $t('auth.validation.require') }}</span>
            </div>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group :label="$t('create.inputs.tags')">
            <b-form-input
              v-model="form.tagList"
              name="tagList"
            />
          </b-form-group>
          <b-form-group
            v-slot="{ ariaDescribedby }"
            label="Form-checkbox-group stacked checkboxes"
          >
            <b-form-checkbox-group
              v-model="form.body"
              :options="form.tagList"
              :aria-describedby="ariaDescribedby"
              name="flavour-2a"
              stacked
            />
          </b-form-group>
        </b-col>
      </b-row>

      <BaseButton :loading="buttonLoading" :native-type="'submit'" :variant="'primary'">
        {{ $t('create.create.button') }}
      </BaseButton>
    </b-form>
  </div>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      submitted: false,
      buttonLoading: false,
      form: {
        title: null,
        description: null,
        body: null,
        tagList: null
      }
    }
  },
  mounted () {
    console.log(this.$ArticlesService.query())
  },
  validations: {
    form: {
      title: { required },
      description: { required },
      body: {
        required,
        minLength: minLength(10)
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
