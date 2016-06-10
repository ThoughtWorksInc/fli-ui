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
  }).then(response => response.data.event)
}

export function fetchGroupsWithCondition (condition) {
  const encodedQuery = encodeURI(condition)
  return ajax({
    url: config['fliAPI'] + 'api/groups?conditions=' + encodedQuery,
    method: 'GET'
  }).then(response => response.data.groups)
}

export function fetchStories () {
  return ajax({
    url: config['fliAPI'] + 'api/stories',
    method: 'GET'
  }).then(response => response.data.stories)
}

function ajax (options) {
  return new Promise((resolve, reject) => Vue.http(options).then(resolve).catch(reject))
}
