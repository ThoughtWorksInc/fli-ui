import Vue from 'vue'
import VueResource from 'vue-resource'
import Dashboard from 'src/Dashboard'
Vue.use(VueResource)

export default class AppDashboard {
  constructor (root) {
    this.root = root
  }

  start () {
    const App = Vue.component('dashboard', Dashboard)
    return new Promise((resolve, reject) => {
      this.app = new App({el: this.root})
      Vue.nextTick(resolve)
    })
  }

}
