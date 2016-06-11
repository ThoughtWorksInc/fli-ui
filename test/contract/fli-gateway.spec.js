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
    FliGateway.createEvent(eventType, storyNumber).then(event => {
      expect(event).toBeTruthy()
      expect(event.event_type).toBe(eventType)
      expect(event.story_id).toBeTruthy()
    }).catch(failTest).then(done)
  })

  it('gets cycle time data for stories segmented by conditions', (done) => {
    FliGateway.fetchGroupsWithCondition('all').then(groups => {
      expect(groups.length).toBe(1)
    }).catch(failTest).then(done)
  })

  it('gets all stories', (done) => {
    FliGateway.fetchStories().then(stories => {
      expect(stories).toBeTruthy()
      expect(stories.length).toBeGreaterThan(1)
      expect(stories[0].name).toBeDefined()
      expect(stories[0].daysInProgress).toBeDefined()
    }).catch(failTest).then(done)
  })
})
