import config from 'config'
import Vue from 'vue'

export function createEvent (eventType, storyNumber, occurDate, occurTime) {
  const occurredAt = parseDateTime(occurDate, occurTime)
  if (new Date(occurredAt) > new Date()) {
    return Promise.resolve({'error': 'Event must occur in the past'})
  }
  return ajax({
    url: config['fliAPI'] + 'events',
    method: 'POST',
    data: {
      'eventType': eventType,
      'occurredAt': occurredAt,
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

export function deleteEvent (eventId) {
  return ajax({
    url: config['fliAPI'] + 'events/' + eventId,
    method: 'DELETE'
  })
}

export function fetchCharacteristicValues (characteristic) {
  return ajax({
    url: config['fliAPI'] + 'characteristic/' + characteristic,
    method: 'GET'
  }).then(response => response.data.characteristicValues)
}

function parseDateTime (occurDate, occurTime) {
  var occurredAt = new Date().toISOString()
  if (occurDate !== undefined && occurDate !== '') {
    occurredAt = new Date(Date.parse(occurDate))
    if (occurTime !== undefined && occurTime !== '') {
      occurredAt.setUTCHours(occurTime.substring(0, 2), occurTime.substring(3, 5))
    }
    occurredAt = occurredAt.toISOString()
  }
  return occurredAt
}

function ajax (options) {
  return new Promise((resolve, reject) => Vue.http(options).then(resolve).catch(reject))
}
