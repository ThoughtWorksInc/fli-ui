<template>
  <h2> Cycle Time Distribution </h2>
  <div id="distribution"></div>
  <div>
    <p>Distribution of cycle time can be a useful tool to understand how similar your stories are to each other.</p>

    <p>Teams that have a single mode distribution can be confident that all stories will complete in a similar amount of time.</p>

    <p>Teams with mulitple modes within their distribution, can get accurate predictions as to when a given story will complete, if they can identify which group of stories it belongs.</p>
  </div>
</template>


<script>
import * as FliGateway from 'src/services/fli-gateway'
import * as GoogleGateway from 'src/services/google-gateway'
import * as Distribution from 'src/services/distribution'

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
    drawChart () {
      FliGateway.fetchGroupsWithCondition('all').then(groups => {
        // what do we do if there are no completed groups?
        Distribution.addDataSeries(groups[0].description, groups[0].cycleTimeDistribution.values)
      }).then(() => {
        Distribution.drawDistribution()
      })
    }
  }
}
</script>
