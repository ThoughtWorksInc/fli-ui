<template>
  <h2> Aggregated Cycle Time </h2>
  <div>
    <form>
      <label for="conditions">Conditions</label>
      <div class="tooltip">
        (?)
        <span class="tooltiptext">
            <b>with</b> <i>event</i> <br>
            <b>without</b> <i>event</i> <br>
            <b>with</b> <i>event</i> <b>versus</b> <b>without</b> <i>event</i>
        </span>
      </div>
      <input id='conditions' 
             class="conditions-input" 
             type="text" 
             v-model="inputConditions" 
             v-on:keyup.enter="updateConditions"
             v-bind:class="{ 'invalid': conditionsInvalid }"
      />
      <button v-on:click="updateConditions" type="button" role="button">Compare</button>
    </form>
  </div>
  <div id="conditions-message" class="error" v-show="conditionsInvalid">
    <div> Uh oh! Your comparison doesn't seem valid.</div>
    <div>
      Please check if there are any mispellings or non existant activities
      or modifiers in your condition.
    </div>
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
      inputConditions: '',
      conditionsInvalid: false
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
      var self = this
      AggregateCycleTime.clearDataSeries()

      var groupsPromise = FliGateway.fetchGroupsWithCondition(this.condition)

      var successCallback = function (groups) {
        self.conditionsInvalid = false

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

        AggregateCycleTime.drawCycleTime()
      }

      var failureCallback = function () {
        self.conditionsInvalid = true
        AggregateCycleTime.drawCycleTime()
      }

      groupsPromise.then(successCallback, failureCallback)
    }
  }
}
</script>

<style>
  .conditions-input {
    width: 30%;
  }

  .conditions-input.invalid {
    background-color: #ffdddd;
  }

  #conditions-message.error {
    color: red;
  }

</style>
