<template>
  <h2>All Stories</h2>
  <div>
    <table style="width:100%">
      <thead>
        <tr>
          <td>Story</td>
          <td>Days in Progress</td>
        </tr>
      </thead>
      <tbody v-for="story in stories">
        <tr>
          <td><button v-on:click="goToOdyssey(story.name)" class="story-button">{{ story.name }}</button></td>
          <td>{{story.daysInProgress}}</td>
        </tr>
      </tbody>
    </table>
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
