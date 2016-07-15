<template>
  <h2 class="story-journey-title"> Story Journey for: {{ activeStory }}</h2>
  <p class="story-days-in-progress">{{ daysInProgressText }}</p>
  <div v-if="storyCharacteristics.length > 0">
    <h4>Characteristics</h4>
    <ul v-for="characteristic in storyCharacteristics">
      <li v-if="characteristic.value !== 'unassigned' " class="characteristic">
        {{ characteristic.type }} -- {{ characteristic.value }}
      </li>
      <li v-else class="characteristic">
        {{ characteristic.type }} --   
      </li>

    </ul>
  </div>
  <div>
    <h4>Events</h4>
    <ul v-for="event in storyEvents">
      <li class="event">
        <button v-on:click="deleteEvent(event)" class="delete-event">delete</button>
        {{ formatDate(event.occurredAt) }} -- {{ event.type }}
      </li>
    </ul>
  </div>
</template>

<script>
import * as FliGateway from 'src/services/fli-gateway'

export default {
  props: {
    daysInProgressText: '',
    storyEvents: [],
    storyCharacteristics: []
  },

  vuex: {
    getters: {
      activeStory: state => state.activeStory
    }
  },

  ready () {
    FliGateway.fetchStory(this.activeStory).then(story => {
      this.toggleText(story.daysInProgress, story.status)
      this.storyEvents = story.events
      this.storyCharacteristics = story.characteristics
    })
  },

  methods: {
    toggleText (daysInProgress, status) {
      var unit = daysInProgress === 1 ? ' day.' : ' days.'
      if (status === 'Completed') {
        this.daysInProgressText = 'This story completed in ' + daysInProgress + unit
      } else if (status === 'In Progress') {
        this.daysInProgressText = 'This story has been in progress for ' + daysInProgress + unit
      } else {
        this.daysInProgressText = 'This story has not yet started'
      }
    },

    formatDate (date) {
      let d = new Date(date)
      return (d.getUTCMonth() + 1) + '-' + d.getUTCDate() + '-' + d.getUTCFullYear() + ' ' + d.getUTCHours() + ':' + d.getMinutes()
    },

    deleteEvent (event) {
      FliGateway.deleteEvent(event.id).then(() => {
        FliGateway.fetchStory(this.activeStory).then(updatedStory => {
          this.toggleText(updatedStory.daysInProgress, updatedStory.status)
          this.storyEvents = updatedStory.events
        })
      })
    }

  }
}
</script>
