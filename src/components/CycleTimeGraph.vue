<template>
  <h2> Aggregated Cycle Time </h2>
  <div>
    <form>
      <label for="conditions">Conditions</label>
      <input id='conditions' class="conditions-input" type="text" v-model="inputConditions"/>
      <button v-on:click="updateConditions" type="button" role="button">Compare</button>
    </form>
  </div>
  <div id="cycleTime"></div>
</template>

<script>
import * as FliGateway from 'src/services/fli-gateway'
import * as GoogleGateway from 'src/services/google-gateway'
import * as AggregateCycleTime from 'src/services/aggregate-cycle-time'

export default {
  data () {
    return {
      condition: 'all',
      inputConditions: ''
    }
  },

  ready () {
    GoogleGateway.setCallback(this.drawChart)
  },

  methods: {
    updateConditions () {
      this.condition = this.inputConditions
      this.drawChart()
    },

    drawChart () {
      AggregateCycleTime.clearDataSeries()
      FliGateway.fetchGroupsWithCondition(this.condition).then(groups => {
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
      }).then(() => {
        AggregateCycleTime.drawCycleTime()
      })
    }
  }
}
</script>

<style>
.conditions-input {
  width: 30%;
}
</style>