<template>
  <div>
    <form>
      <fieldset>
        <label for="event_type">Event Type</label>
        <input id='event_type' class="event-type-input" type="text" v-model="eventType"/>
        <div class="tooltip">(?)
          <span class="tooltiptext">use <i>start</i> to begin a story and <i>end</i> to finish a story</span>
        </div>
        <label for="story_number">Story Number</label>
        <input id='story_number' class="story-number-input" type="text" v-model="storyNumber"/>
        <button v-on:click="addEvent" class="add-event-button" type="button" role="button">Add Event</button>
      </fieldset>
    </form>
  </div>
  <div class="newly-added-event-text" v-if="eventAdded">Event added with id: {{ eventId }}</div>
</template>
<script>
import * as FliGateway from 'src/services/fli-gateway'

export default {
  props: {
    eventAdded: false,
    eventId: ''
  },

  data () {
    return {
      eventType: '',
      storyNumber: '',
      occurredAt: ''
    }
  },

  methods: {
    addEvent () {
      FliGateway.createEvent(this.eventType, this.storyNumber).then(event => {
        this.eventId = event.id
        this.eventAdded = true
      })
    }
  }
}
</script>
<style>
.tooltip {
   position: relative;
   display: inline-block;
   border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

.tooltip .tooltiptext {
   visibility: hidden;
   width: 350px;
   background-color: #555;
   color: #fff;
   text-align: center;
   padding: 5px 0;
   border-radius: 6px;
   position: absolute;
   z-index: 1;
   bottom: 5px;
   left: 150%;
   margin-left: -60px;
   opacity: 0;
   transition: opacity 1s;
}

.tooltip .tooltiptext::after {
   content: "";
   position: absolute;
   top: 100%;
   left: -90%;
   margin-left: -5px;
   border-width: 5px;
   border-style: solid;
   border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
   visibility: visible;
   opacity: 1;
}
</style>
