import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const mutations = {
  SET_ACTIVE_STORY (state, storyName) {
    state.activeStory = storyName
  }
}

export function createStore () {
  const state = {
    activeStory: ''
  }

  return new Vuex.Store({
    state,
    mutations
  })
}
