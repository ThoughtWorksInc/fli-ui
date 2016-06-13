<template>
  <h2 class="story-journey-title"> Story Journey for: {{ activeStory }}</h2>
  <p class="story-days-in-progress" v-if="storyEnded">This story completed in {{ daysInProgress }} days</p>
  <p class="story-days-in-progress" v-else>This story has been in progress for {{ daysInProgress }} days</p>
</template>

<script>
import * as FliGateway from 'src/services/fli-gateway'

export default {
  props: {
    storyEnded: false,
    daysInProgress: ''
  },

  vuex: {
    getters: {
      activeStory: state => state.activeStory
    }
  },

  ready () {
    FliGateway.fetchStory(this.activeStory).then(story => {
      this.daysInProgress = story.cycleTime
      this.storyEnded = story.ended
    })
  }
}
</script>