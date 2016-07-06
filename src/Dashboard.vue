<template>
  <main>
    <div>
      <add-event></add-event>
      <div class="main-container">
        <div class="cycle-time-graph">
          <div>
            <cycle-time-graph></cycle-time-graph>
          </div>
          <div>
            <a v-link="{ path: '/about' }">About FLI</a>
          </div>
        </div>
        <div class="dist-and-stories">
          <div>
            <a v-link="{ path: '/distribution' }">view cycle time distribution</a>
          </div>
          <div>
            <stories-list></stories-list>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import './scss/main.scss'
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
  float: left;
  width: 60%;
}

.dist-and-stories {
  display: inline-block;
}

.main-container {
  height: 700px;
}
</style>
