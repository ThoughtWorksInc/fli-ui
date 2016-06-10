import Vue from 'vue'
import VueResource from 'vue-resource'
import { createRouter } from './router'
import { createStore } from './vuex/store'

Vue.use(VueResource)

export default class AppDashboard {
  constructor (root) {
    this.root = root
  }

  start () {
    var router = createRouter()
    var store = createStore()
    this.router = router
    this.root.appendChild(document.createElement('router-view'))
    return new Promise((resolve, reject) => {
      router.start({store}, this.root, resolve)
    })
  }

}
