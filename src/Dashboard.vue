<template>
  <main>
    <div>
    <header class="header">
      <a v-link="{ path: '/about' }">About FLI</a>
      <a v-link="{ path: '/admin' }">Admin</a>
    </header>
      <add-event></add-event>
      <div class="main-container">
        <div class="cycle-time-graph">
          <div>
            <cycle-time-graph></cycle-time-graph>
          </div>
        </div>
        <div class="dist-and-stories">
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
import Header from './components/Header'

export default {
  components: {
    AddEvent,
    CycleTimeGraph,
    StoriesList,
    Header
  }
}
</script>

<style>
.header {
  padding: 20px;
  margin-bottom: 20px;
}

.header a {
  padding: 10px;
}
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
