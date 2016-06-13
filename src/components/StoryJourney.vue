<template>
  <h2 class="story-journey-title"> Story Journey for: {{ activeStory }}</h2>
  <p class="story-days-in-progress">{{ daysInProgressText }}</p>
</template>

<script>
import * as FliGateway from 'src/services/fli-gateway'

export default {
  props: {
    daysInProgressText: ''
  },

  vuex: {
    getters: {
      activeStory: state => state.activeStory
    }
  },

  ready () {
    FliGateway.fetchStory(this.activeStory).then(story => {
      this.toggleText(story.cycleTime, story.status)
    })
  },

  methods: {
    toggleText (daysInProgress, status) {
      if (status === 'Completed') {
        this.daysInProgressText = 'This story completed in ' + daysInProgress + ' days'
      } else if (status === 'In Progress') {
        this.daysInProgressText = 'This story has been in progress for ' + daysInProgress + ' days'
      } else {
        this.daysInProgressText = 'This story has not yet started'
      }
    }
  }
}
</script>