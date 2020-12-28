import Vue from 'vue'
/*
*  added globally vuelidate mixin
*/
import { validationMixin } from 'vuelidate'
import globallyMixins from './globallyMixins'
Vue.mixin(validationMixin)
Vue.mixin(globallyMixins)
