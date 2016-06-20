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
      expect(event.eventType).toBe(eventType)
      expect(event.storyId).toBeTruthy()
    }).catch(failTest).then(done)
  })

  it('has cycle time stats for the story group', (done) => {
    FliGateway.fetchGroupsWithCondition('all').then(groups => {
      expect(groups.length).toBe(1)
      var stats = groups[0].cycleTimeStatistics
      expect(stats.mean).toBeDefined()
      expect(stats.median).toBeDefined()
      expect(stats.lowerBound).toBeDefined()
      expect(stats.upperBound).toBeDefined()
      expect(stats.standardDeviation).toBeDefined()
    }).catch(failTest).then(done)
  })

  it('has cycle time distribution for the story group', (done) => {
    FliGateway.fetchGroupsWithCondition('all').then(groups => {
      expect(groups.length).toBe(1)
      var distribution = groups[0].cycleTimeDistribution
      expect(distribution.start).toBeDefined()
      expect(distribution.end).toBeDefined()
      expect(distribution.values).toBeDefined()
      // need to introduce a completed story - change above to lenth > 0
      // expect(distribution.values[0].point).toBeDefined()
      // expect(distribution.values[0].count).toBeDefined()
    }).catch(failTest).then(done)
  })

  it('gets all stories', (done) => {
    FliGateway.fetchStories().then(stories => {
      expect(stories).toBeTruthy()
      expect(stories.length).toBeGreaterThan(0)
      expect(stories[0].name).toBeDefined()
      expect(stories[0].daysInProgress).toBeDefined()
      expect(stories[0].status).toBeDefined()
    }).catch(failTest).then(done)
  })

  it('gets a single story', (done) => {
    FliGateway.fetchStory('1234').then(story => {
      expect(story).toBeTruthy()
      expect(story.name).toBe('1234')
      expect(story.daysInProgress).toBeDefined()
      expect(story.status).toBeDefined()
      expect(story.events.length).toBeGreaterThan(0)
      expect(story.events[0].id).toBeDefined()
      expect(story.events[0].type).toBeDefined()
      expect(story.events[0].occurredAt).toBeDefined()
    }).catch(failTest).then(done)
  })

  it('deletes an event from a story', (done) => {
    FliGateway.createEvent('blah type', 'blah story').then(event => {
      const eventId = event.id
      FliGateway.deleteEvent(eventId).then(response => {
        expect(response.status).toBe(200)
      }).catch(failTest).then(done)
    })
  })
})
