<template>
  <h2>Stories</h2>
  <div>
    <label><input type="checkbox" id="show-all__test" value="all_stories" v-model="checked"> Show all stories</label>

    <table style="width:100%">
      <thead>
        <tr>
          <td>Story</td>
          <td>Days in Progress</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody id="stories-body__test" v-for="story in stories">
        <tr v-if="checked || story.status==='In Progress'">
          <td><button v-on:click="goToJourney(story.name)" class="story-button">{{ story.name }}</button></td>
          <td>{{story.daysInProgress}}</td>
          <td id="status-cell__test"> {{story.status}}</td>
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
      stories: [],
      checked: false
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
    goToJourney (storyName) {
      this.setActiveStory(storyName)
      this.$router.go('story-journey')
    }
  }
}
</script>
