<template>
  <div class="login-box">
    <b-form @submit.stop.prevent="onSubmit" @keydown.enter="onSubmit">
      <b-form-group id="example-input-group-1" label="Name" label-for="example-input-1">
        <b-form-input
          id="example-input-1"
          v-model="$v.form.name.$model"
          name="example-input-1"
          :state="validateState('name')"
          aria-describedby="input-1-live-feedback"
        />

        <b-form-invalid-feedback
          id="input-1-live-feedback"
        >
          This is a required field and must be at least 3 characters.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="example-input-group-2" label="Food" label-for="example-input-2">
        <b-form-select
          id="example-input-2"
          v-model="$v.form.food.$model"
          name="example-input-2"
          :options="foods"
          :state="validateState('food')"
          aria-describedby="input-2-live-feedback"
        />

        <b-form-invalid-feedback id="input-2-live-feedback">
          This is a required field.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary">
        Submit
      </b-button>
      <b-button class="ml-2" @click="resetForm()">
        Reset
      </b-button>
    </b-form>
  </div>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  layout: 'authLayout',
  data () {
    return {
      foods: [
        { value: null, text: 'Choose...' },
        { value: 'apple', text: 'Apple' },
        { value: 'orange', text: 'Orange' }
      ],
      form: {
        name: null,
        food: null
      }
    }
  },
  validations: {
    form: {
      food: {
        required
      },
      name: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {

    onSubmit () {
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
  background-color: red;
}
</style>
