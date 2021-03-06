export const stub = {}

export function clearStubResponses () {
  Object.keys(stub).forEach(key => {
    delete stub[key]
  })
}

export function createEvent (eventType, storyNumber) {
  return stub.createEvent || new Promise((resolve, reject) => {
    resolve({ 'eventType': 'event type stub' })
  })
}

export function fetchGroups () {
  return new Promise((resolve, reject) => {
    resolve([
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
    ])
  })
}

export function fetchStories () {
  return new Promise((resolve, reject) => {
    resolve([{ 'name': 'blah', 'status': 'In Progress', 'daysInProgress': 7 },
  { 'name': 'blah', 'status': 'Completed', 'daysInProgress': 7 }])
  })
}

export function fetchStory (storyNumber) {
  return stub.fetchStory || Promise.resolve({ 'name': 'blah', 'status': 'In Progress', 'daysInProgress': 3 })
}

export function setCallback (callbackFunction) {
  return Promise.resolve({})
}
