export const stub = {}

export function clearStubResponses () {
  Object.keys(stub).forEach(key => {
    delete stub[key]
  })
}

export function createEvent (eventType, storyNumber) {
  return new Promise((resolve, reject) => {
    resolve({ response: { data: { 'event': { 'event_type': 'event type stub' } } } })
  })
}

export function fetchGroups () {
  return new Promise((resolve, reject) => {
    resolve({ response: { data: { 'groups': [
      {
        'description': 'all',
        'sampleSize': 2,
        'cycleTimeStatistics': {
          'mean': 1,
          'median': 1,
          'standardDeviation': 1,
          'lowerBound': 1,
          'upperBound': 1
        }
      }
    ] } } })
  })
}

export function fetchStories () {
  return new Promise((resolve, reject) => {
    resolve({ response: { data: { 'stories': { 'name': 'blah', 'daysInProgress': 7 } } } })
  })
}

export function fetchStory (storyNumber) {
  return stub.fetchStory || Promise.resolve({ 'name': 'blah', 'ended': false, 'cycleTime': 3 })
}

export function setCallback (callbackFunction) {
  return new Promise((resolve, reject) => {
    resolve()
  })
}
