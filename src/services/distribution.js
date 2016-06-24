let dataSeries = []

export function drawDistribution () {
  var data = window.google.visualization.arrayToDataTable(dataSeries)
  var options = defineChartFormat()
  var chart = new window.google.visualization.LineChart(document.getElementById('distribution'))
  chart.draw(data, options)
}

export function addDataSeries (description, values) {
  dataSeries.push(['position', description])
  for (var i = 0; i < values.length; i++) {
    dataSeries.push([values[i].point, values[i].count])
  }
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
