import config from 'config'
import Vue from 'vue'

export function createEvent (eventType, storyNumber) {
  return ajax({
    url: config['fliAPI'] + 'api/events',
    method: 'POST',
    data: {
      'event_type': eventType,
      'occurred_at': new Date().toISOString(),
      'story': storyNumber
    }
  })
}

function ajax (options) {
  return new Promise((resolve, reject) => Vue.http(options).then(resolve).catch(reject))
}
