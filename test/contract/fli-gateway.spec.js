import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import * as FliGateway from 'src/services/fli-gateway'

describe('fli gateway', () => {
  const failTest = (error) => {
    expect(error).toBeUndefined()
  }

  it('creates a new event', (done) => {
    var eventType = 'blah event'
    var storyNumber = 'blah story'
    FliGateway.createEvent(eventType, storyNumber).then(response => {
      expect(response.data.event).toBeTruthy()
      expect(response.data.event.event_type).toBe(eventType)
      expect(response.data.event.story_id).toBeTruthy()
    }).catch(failTest).then(done)
  })

  it('gets cycle time data for all stories', (done) => {
    FliGateway.fetchGroups().then(response => {
      expect(response.data.groups.length).toBe(1)
    }).catch(failTest).then(done)
  })
})
