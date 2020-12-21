import Vue from 'vue'
/*
*  added globally vuelidate mixin
*/
import { validationMixin } from 'vuelidate'
import vuelidateMethod from './vuelidate'
Vue.mixin(validationMixin)
Vue.mixin(vuelidateMethod)
