<template>
  <main>
    <div>
      <add-event></add-event>
      <div class="main-container">
        <div class="cycle-time-graph">
          <cycle-time-graph></cycle-time-graph>
        </div>
        <div class="stories-list">
          <stories-list></stories-list>
        </div>
      </div>
      <div>
        <a v-link="{ path: '/about' }">About FLI</a>
      </div>
    </div>
  </main>
</template>
<script>
import AddEvent from './components/AddEvent'
import CycleTimeGraph from './components/CycleTimeGraph'
import StoriesList from './components/StoriesList'

export default {
  components: {
    AddEvent,
    CycleTimeGraph,
    StoriesList
  }
}
</script>

<style>
.cycle-time-graph {
  width: 60%;
  float: left;
  display: inline-block;
}

.stories-list {
  display: inline-block;
}

.main-container {
  height: 700px;
}
</style>
