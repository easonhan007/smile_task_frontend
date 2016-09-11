import Vue from 'vue'
import VueResouce from 'vue-resource'
import App from './App'

/* eslint-disable no-new */
Vue.use(VueResouce)
Vue.http.options.xhr = {withCredentials: true}
new Vue({
  el: 'body',
  components: { App }
})
