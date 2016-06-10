<template>
  <h2>Story List</h2>
  <div>
    <ul v-for="story in stories">
      <li>{{ story.name }}</li>
    </ul>
  </div>
</template>

<script>
import * as FliGateway from 'src/services/fli-gateway'

export default {
  data () {
    return {
      stories: []
    }
  },

  ready () {
    FliGateway.fetchStories().then(stories => {
      this.stories = stories
    })
  }
}
</script>