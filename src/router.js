import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from './Dashboard'
import StoryJourney from './components/StoryJourney'
import About from './components/About'
import DistributionGraph from './components/DistributionGraph'

Vue.use(VueRouter)

export function createRouter () {
  var router = new VueRouter()

  router.map({
    '/': {
      component: Dashboard
    },
    '/story-journey': {
      component: StoryJourney
    },
    '/about': {
      component: About
    },
    '/distribution': {
      component: DistributionGraph
    }
  })

  return router
}
