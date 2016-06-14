import config from 'config'
import Vue from 'vue'

export function createEvent (eventType, storyNumber) {
  return ajax({
    url: config['fliAPI'] + 'events',
    method: 'POST',
    data: {
      'eventType': eventType,
      'occurredAt': new Date().toISOString(),
      'story': storyNumber
    }
  }).then(response => response.data.event)
}

export function fetchGroupsWithCondition (condition) {
  const encodedQuery = encodeURI(condition)
  return ajax({
    url: config['fliAPI'] + 'groups?conditions=' + encodedQuery,
    method: 'GET'
  }).then(response => response.data.groups)
}

export function fetchStories () {
  return ajax({
    url: config['fliAPI'] + 'stories',
    method: 'GET'
  }).then(response => response.data.stories)
}

export function fetchStory (storyName) {
  const encodedStoryName = encodeURI(storyName)
  return ajax({
    url: config['fliAPI'] + 'stories/' + encodedStoryName,
    method: 'GET'
  }).then(response => response.data.story)
}

function ajax (options) {
  return new Promise((resolve, reject) => Vue.http(options).then(resolve).catch(reject))
}
