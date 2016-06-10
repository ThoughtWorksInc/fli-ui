import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from './Dashboard'
import StoryOdyssey from './components/StoryOdyssey'

Vue.use(VueRouter)

export function createRouter () {
  var router = new VueRouter()

  router.map({
    '/': {
      component: Dashboard
    },
    '/story-odyssey': {
      component: StoryOdyssey
    }
  })

  return router
}
