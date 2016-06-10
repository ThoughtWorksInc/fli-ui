<template>
  <h2 class="story-odyssey-title"> Story Odyssey for: {{ activeStory }}</h2>
</template>

<script>
export default {
  vuex: {
    getters: {
      activeStory: state => state.activeStory
    }
  }
}
</script>