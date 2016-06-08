<template>
  <div id="app">
    <h1>Dashboard</h1>
    <add-event></add-event>
    <cycle-time-graph></cycle-time-graph>
  </div>
</template>
<script>
import AddEvent from './components/AddEvent'
import CycleTimeGraph from './components/CycleTimeGraph'

export default {
  components: {
    AddEvent,
    CycleTimeGraph
  }
}
</script>