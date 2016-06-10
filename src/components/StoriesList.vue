<template>
  <h2>Story List</h2>
  <div>
    <ul v-for="story in stories">
      <li>
        <button v-on:click="goToOdyssey(story.name)" class="story-button">{{ story.name }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import * as FliGateway from 'src/services/fli-gateway'
import { setActiveStory } from 'src/vuex/actions'

export default {
  data () {
    return {
      stories: []
    }
  },

  vuex: {
    actions: {
      setActiveStory
    }
  },

  ready () {
    FliGateway.fetchStories().then(stories => {
      this.stories = stories
    })
  },

  methods: {
    goToOdyssey (storyName) {
      this.setActiveStory(storyName)
      this.$router.go('story-odyssey')
    }
  }
}
</script>