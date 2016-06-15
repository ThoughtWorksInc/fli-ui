import * as FliGateway from 'src/services/fli-gateway'
import Vue from 'vue'

describe('fli gateway', () => {
  const failTest = (error) => {
    expect(error).toBeUndefined()
  }

  it('calls events endpoint', (done) => {
    Vue.http = () => Promise.resolve({'data': {event: 'some garbage'}})
    spyOn(Vue, 'http').and.callThrough()
    var baseTime = new Date(2016, 1, 23)
    window.jasmine.clock().mockDate(baseTime)

    FliGateway.createEvent('blah', 'blahStory').then(() => {
      expect(Vue.http).toHaveBeenCalledWith(
        {
          url: 'http://localhost:4567/events',
          method: 'POST',
          data: {
            'eventType': 'blah',
            'occurredAt': baseTime.toISOString(),
            'story': 'blahStory'
          }
        }
      )
    }).catch(failTest).then(done)
  })

  it('gets groups by condition', (done) => {
    Vue.http = () => Promise.resolve({'data': {'groups': [{'description': 'blah desc'}]}})
    spyOn(Vue, 'http').and.callThrough()

    FliGateway.fetchGroupsWithCondition('with kickoff').then(() => {
      expect(Vue.http).toHaveBeenCalledWith(
        {
          url: 'http://localhost:4567/groups?conditions=with%20kickoff',
          method: 'GET'
        }
      )
    }).catch(failTest).then(done)
  })

  it('gets all stories', (done) => {
    Vue.http = () => Promise.resolve({'data': {'stories': [{'name': 'blah name', 'daysInProgress': 7}]}})
    spyOn(Vue, 'http').and.callThrough()

    FliGateway.fetchStories().then(() => {
      expect(Vue.http).toHaveBeenCalledWith(
        {
          url: 'http://localhost:4567/stories',
          method: 'GET'
        }
      )
    }).catch(failTest).then(done)
  })

  it('gets the details for a story', (done) => {
    Vue.http = () => Promise.resolve({'data': {'story': {'name': 'blah name'}}})
    spyOn(Vue, 'http').and.callThrough()

    FliGateway.fetchStory('blah name').then(() => {
      expect(Vue.http).toHaveBeenCalledWith(
        {
          url: 'http://localhost:4567/stories/blah%20name',
          method: 'GET'
        }
      )
    }).catch(failTest).then(done)
  })

  it('deletes an event from a story', (done) => {
    Vue.http = () => Promise.resolve({})
    spyOn(Vue, 'http').and.callThrough()

    FliGateway.deleteEvent(7).then(() => {
      expect(Vue.http).toHaveBeenCalledWith(
        {
          url: 'http://localhost:4567/events/7',
          method: 'DELETE'
        }
      )
    }).catch(failTest).then(done)
  })
})
