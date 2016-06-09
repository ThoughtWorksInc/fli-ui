export function setCallback (callbackFunction) {
  return new Promise((resolve, reject) => {
    resolve(window.google.charts.setOnLoadCallback(callbackFunction))
  })
}
