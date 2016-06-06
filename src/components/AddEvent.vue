<template>
  <div>
    <h4>Add Event</h4>
    <form v-on:submit="addEvent">
      <fieldset>
        <label for="event_type">Event Type</label>
        <input id='event_type' type="text" v-model="eventType"/>
        <label for="story_number">Story Number</label>
        <input id='story_number' type="text" v-model="story_number"/>
        <button>Add Event</button>
      </fieldset>
    </form>
  </div>
</template>
<script>
</script>