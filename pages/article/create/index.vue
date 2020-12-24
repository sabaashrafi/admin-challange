<template>
  <div>
    <h1 class="warm-grey text-center mb-4">
      {{ $t("create.title") }}
    </h1>
    <b-form @submit.stop.prevent="createArticle" @keydown.enter="createArticle">
      <b-row>
        <b-col md="9">
          <b-form-group :label="$t('create.inputs.title')">
            <b-form-input
              v-model="$v.form.title.$model"
              name="title"
              :state="validateState('title')"
            />
            <div
              v-if="submitted && $v.form.title.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.form.title.required">{{
                $t("auth.validation.require")
              }}</span>
            </div>
          </b-form-group>
          <b-form-group :label="$t('create.inputs.description')">
            <b-form-input
              v-model="$v.form.description.$model"
              name="description"
              :state="validateState('description')"
            />
            <div
              v-if="submitted && $v.form.description.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.form.description.required">{{
                $t("auth.validation.require")
              }}</span>
            </div>
          </b-form-group>
          <b-form-group :label="$t('create.inputs.body')">
            <b-form-textarea
              v-model="$v.form.body.$model"
              name="body"
              rows="8"
              :state="validateState('body')"
            />
            <div
              v-if="submitted && $v.form.body.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.form.body.required">{{
                $t("auth.validation.require")
              }}</span>
            </div>
          </b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-group :label="$t('create.inputs.tags')">
            <b-form-input v-model="newTag" name="tagList" @change="addNewTag" />
          </b-form-group>
          <b-form-group>
            <b-form-checkbox-group
              v-model="form.tagList"
              :options="tagsList"
              name="flavour-2a"
              stacked
            />
          </b-form-group>
        </b-col>
      </b-row>

      <BaseButton
        :loading="buttonLoading"
        :native-type="'submit'"
        :variant="'primary'"
      >
        {{ $t("create.button") }}
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
      newTag: null,
      form: {
        title: null,
        description: null,
        body: null,
        tagList: []
      },
      tagsList: []
    }
  },
  mounted () {
    this.getAllTag()
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
    async createArticle () {
      this.submitted = true

      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return
      }
      this.buttonLoading = true
      await this.$ArticlesService.create(this.form).then(resp => console.log(resp))
    },
    async getAllTag () {
      this.tagsList = await this.$TagsService.get().then(tagsList => tagsList.tags.sort())
      this.tagsList = this.tagsList.filter(item => item.trim().length >= 1)
    },
    addNewTag () {
      this.tagsList.push(this.newTag)
      this.form.tagList.push(this.newTag)
    }
  }
}
</script>
<style lang="scss">
.login-box {
  background-color: $bg-gray;
}
</style>
