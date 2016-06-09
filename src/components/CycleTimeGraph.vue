<template>
  <h2> Aggregated Cycle Time </h2>
  <div id="cycleTime"></div>
</template>

<script>
import * as FliGateway from 'src/services/fli-gateway'
import * as AggregateCycleTime from 'src/AggregateCycleTime'

export default {
  ready () {
    FliGateway.fetchGroups().then(groups => {
      console.log(groups)
    })
    window.google.charts.setOnLoadCallback(AggregateCycleTime.drawCycleTime())
  }
}
</script>