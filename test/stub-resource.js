export function createEvent (eventType, storyNumber) {
  return new Promise((resolve, reject) => {
    resolve({ response: { data: { 'event': { 'event_type': 'event type stub' } } } })
  })
}

export function fetchGroups () {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

export function setCallback (callbackFunction) {
  return new Promise((resolve, reject) => {
    resolve()
  })
}
