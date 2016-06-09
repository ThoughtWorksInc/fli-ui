<template>
  <h2> Aggregated Cycle Time </h2>
  <div id="cycleTime"></div>
</template>

<script>
import * as FliGateway from 'src/services/fli-gateway'
import * as GoogleGateway from 'src/services/google-gateway'
import * as AggregateCycleTime from 'src/AggregateCycleTime'

export default {
  ready () {
    // window.google.charts.setOnLoadCallback(AggregateCycleTime.drawCycleTime)
    GoogleGateway.setCallback(AggregateCycleTime.drawCycleTime)
    FliGateway.fetchGroups().then(groups => {
      for (const group of groups) {
        AggregateCycleTime.addDataSeries(
          group.description,
          group.sampleSize,
          group.cycleTimeStatistics.mean,
          group.cycleTimeStatistics.lowerBound,
          group.cycleTimeStatistics.standardDeviation,
          group.cycleTimeStatistics.upperBound
        )
      }
    })
  }
}
</script>