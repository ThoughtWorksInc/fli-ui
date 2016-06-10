<template>
  <div id="app">
    <h1>Dashboard</h1>
    <add-event></add-event>
    <div>
      <div class="cycle-time-graph">
        <cycle-time-graph></cycle-time-graph>
      </div>
      <div class="stories-list">
        <stories-list></stories-list>
      </div>
    </div>
  </div>
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
</style>