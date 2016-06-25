let dataSeries = []

export function drawTimeline () {
  var dataTable = new window.google.visualization.DataTable()

  dataTable.addColumn({ type: 'string', id: 'Event' })
  dataTable.addColumn({ type: 'date', id: 'Start' })
  dataTable.addColumn({ type: 'date', id: 'End' })

  dataTable.addRows(dataSeries)
  var options = defineChartFormat()
  var chart = new window.google.visualization.Timeline(document.getElementById('story_timeline'))
  chart.draw(dataTable, options)
}

export function addDataSeries (event, start, end) {
  dataSeries.push([event, new Date(start), new Date(end)])
}

function defineChartFormat () {
  return {
    title: 'Distribution',
    vAxis: {
      baseline: 0,
      minValue: 0
    },
    legend: { position: 'bottom' }
  }
}
