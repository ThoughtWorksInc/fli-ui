<template>
  <h2>Story List</h2>
  <div>
    <ul v-for="story in stories">
      <li>
        <button v-on:click="goToOdyssey" class="story-button">{{ story.name }}</button>
      </li>
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
  },

  methods: {
    goToOdyssey () {
      this.$router.go('story-odyssey')
    }
  }
}
</script>