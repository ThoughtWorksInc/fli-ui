<template>
  <h2 class="story-journey-title"> Story Journey for: {{ activeStory }}</h2>
  <p class="story-days-in-progress">{{ daysInProgressText }}</p>
  <h4>Events</h4>
  <ul v-for="event in storyEvents">
    <li class="event">
      {{ formatDate(event.occurredAt) }} -- {{ event.type }}
    </li>
  </ul>
</template>

<script>
import * as FliGateway from 'src/services/fli-gateway'

export default {
  props: {
    daysInProgressText: '',
    storyEvents: []
  },

  vuex: {
    getters: {
      activeStory: state => state.activeStory
    }
  },

  ready () {
    FliGateway.fetchStory(this.activeStory).then(story => {
      this.toggleText(story.cycleTime, story.status)
      this.storyEvents = story.events
    })
  },

  methods: {
    toggleText (daysInProgress, status) {
      var unit = ''
      if (daysInProgress === 1) {
        unit = 'day'
      } else {
        unit = 'days'
      }
      if (status === 'Completed') {
        this.daysInProgressText = 'This story completed in ' + daysInProgress + ' ' + unit + '.'
      } else if (status === 'In Progress') {
        this.daysInProgressText = 'This story has been in progress for ' + daysInProgress + ' ' + unit + '.'
      } else {
        this.daysInProgressText = 'This story has not yet started'
      }
    },

    formatDate (date) {
      let d = new Date(date)
      return (d.getUTCMonth() + 1) + '-' + d.getUTCDate() + '-' + d.getUTCFullYear() + ' ' + d.getUTCHours() + ':' + d.getMinutes()
    }
  }
}
</script>
