<template>
  <div>
    <!-- title of edit page -->
    <h1 v-if="mode == 'edit'" class="warm-grey text-center mb-4">
      {{ $t("edit.title") }}
    </h1>
    <!-- title of create new page -->
    <h1 v-else class="warm-grey text-center mb-4">
      {{ $t("create.title") }}
    </h1>

    <!-- form for create or edit -->
    <b-form @submit.stop.prevent="submit" @keydown.enter="submit">
      <b-row>
        <!-- left column -->
        <b-col md="9">
          <!-- title form group with validation on required -->
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
          <!-- End title form group -->

          <!-- description form group with validation on  required-->
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
          <!-- End description form group -->

          <!-- body form group with validation on  required-->
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
          <!-- End body form group -->
        </b-col>

        <!-- right col -->
        <b-col md="3">
          <!-- Tags form group for add new on onchange input-->
          <b-form-group :label="$t('create.inputs.tags')">
            <b-form-input v-model="newTag" name="tagList" @change="addNewTag" />
          </b-form-group>
          <!-- End tags form group -->

          <!-- List of tags -->
          <b-form-group>
            <b-form-checkbox-group
              v-model="form.tagList"
              :options="tagsList"
              name="flavour-2a"
              stacked
            />
          </b-form-group>
          <!-- End List of tags -->
        </b-col>
      </b-row>

      <!-- submit button -->
      <BaseButton
        :loading="buttonLoading"
        :native-type="'submit'"
        :variant="'primary'"
      >
        {{ $t("create.button") }}
      </BaseButton>
    </b-form>
    <!-- End form -->
  </div>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators'
// Page with two mode, first for edit an article, another for create new article
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
      tagsList: [],
      mode: null
    }
  },
  mounted () {
    this.findMode()
    this.getAllTag()
  },
  // @vuese
  // Validation
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
    // @vuese
    // Fuction base on mode page(edit or create)
    async submit () {
      this.submitted = true
      this.$v.form.$touch()
      // Check validation
      if (this.$v.form.$anyError) {
        return
      }
      this.buttonLoading = true

      if (this.mode === 'edit') {
        await this.$ArticlesService.update(this.form).then((resp) => { this.$router.push('/article') }).finally(() => {
          this.buttonLoading = false
        })
      } else {
        await this.$ArticlesService.create(this.form).then((resp) => { this.$router.push('/article') }).finally(() => {
          this.buttonLoading = false
        })
      }
    },
    // @vuese
    // Get all tags
    async getAllTag () {
      this.tagsList = await this.$TagsService.get().then(tagsList => tagsList.tags.sort())
      this.tagsList = this.tagsList.filter(item => item.trim().length >= 1)
    },
    // @vuese
    // Add new tag with onchange input
    addNewTag () {
      this.tagsList.push(this.newTag)
      this.form.tagList.push(this.newTag)
    },
    // @vuese
    // Find mode base on slug
    async findMode () {
      if (this.$route.query.slug) {
        this.mode = 'edit'

        // If we have this article in store
        const item = this.$store.getters.getEditArticle.item

        if (item.slug) {
          this.form = item
        } else {
          // We dont have it, fetch base on slug on query
          const slug = this.$route.query.slug
          this.form = await this.$ArticlesService.get(slug).then(item => item.article)
        }
      }
    }
  }
}
</script>
<style lang="scss">
.login-box {
  background-color: $bg-gray;
}
</style>
