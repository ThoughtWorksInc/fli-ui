
let dataSeries = []

export function clearDataSeries () {
  dataSeries = []
}

export function drawCycleTime () {
  var data = defineDataTableColumns()
  data.addRows(dataSeries)
  var options = defineChartFormat()
  var view = new window.google.visualization.DataView(data)
  var chart = new window.google.visualization.ComboChart(document.getElementById('cycleTime'))
  chart.draw(view, options)
}

export function addDataSeries (desc, sampleSize, mean, lowerBound, standardDeviation, upperBound) {
  var rangeTip = buildRangeTip(lowerBound, upperBound)
  var description = desc + ' (' + sampleSize + ')'
  dataSeries.push([description,
    lowerBound,
    standardDeviation, rangeTip,
    standardDeviation, rangeTip,
    mean, buildAverageTip(mean)])
}

function defineChartFormat () {
  return {
    backgroundColor: 'white',
    width: 900,
    height: 600,
    bar: {groupWidth: '33%'},
    colors: ['transparent', 'green', 'maroon', 'black'],
    seriesType: 'bars',
    series: {3: {type: 'line'}},
    pointSize: 10,
    pointShape: 'diamond',
    lineDashStyle: [0, 1000],  // hack to make the line disapear
    legend: {position: 'bottom', maxLines: 3},
    annotations: {
      textStyle: {
        fontSize: 10,
        bold: true,
        italic: true,
        color: 'black',     // The color of the text.
        auraColor: '#d799ae', // The color of the text outline.
        opacity: 0.8         // The transparency of the text.
      }
    },
    isStacked: true
  }
}

function defineDataTableColumns () {
  var data = new window.google.visualization.DataTable()
  data.addColumn('string', ' ')
  data.addColumn('number', ' ')
  data.addColumn('number', 'Lower Range')
  data.addColumn({type: 'string', role: 'tooltip'})
  data.addColumn('number', 'Upper Range')
  data.addColumn({type: 'string', role: 'tooltip'})
  data.addColumn('number', 'Average')
  data.addColumn({type: 'string', role: 'tooltip'})
  return data
}

function buildRangeTip (lower, upper) {
  return 'Stories can be expected to finish between ' + lower + ' and ' + upper + ' days.'
}

function buildAverageTip (average) {
  return 'Stories finish on average in ' + average + ' days.'
}
