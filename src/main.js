import Vue from 'vue'
import Dashboard from './Dashboard'
import vueResource from 'vue-resource'

Vue.use(vueResource)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { Dashboard }
})
