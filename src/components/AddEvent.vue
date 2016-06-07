<template>
  <div>
    <h4>Add Event</h4>
    <form>
      <fieldset>
        <label for="event_type">Event Type</label>
        <input id='event_type' class="event-type-input" type="text" v-model="eventType"/>
        <label for="story_number">Story Number</label>
        <input id='story_number' class="story-number-input" type="text" v-model="storyNumber"/>
        <button v-on:click="addEvent" class="add-event-button" type="button" role="button">Add Event</button>
      </fieldset>
    </form>
  </div>
  <div class="newly-added-event-text">Event added!</div>
</template>
<script>
import * as FliGateway from 'src/services/fli-gateway'

export default {
  data () {
    return {
      eventType: '',
      storyNumber: '',
      occurredAt: ''
    }
  },

  methods: {
    addEvent () {
      FliGateway.createEvent(this.eventType, this.storyNumber).then(response => {
        console.log(response.data.event)
      })
    }
  }
}
</script>