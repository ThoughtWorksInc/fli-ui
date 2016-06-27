import * as FliGateway from 'src/services/fli-gateway'
import Vue from 'vue'

describe('fli gateway', () => {
  const failTest = (error) => {
    expect(error).toBeUndefined()
  }

  it('calls events endpoint with a default of current time if date/time are undefined', (done) => {
    Vue.http = () => Promise.resolve({'data': {event: 'some garbage'}})
    spyOn(Vue, 'http').and.callThrough()
    var baseTime = new Date(2016, 1, 23)
    window.jasmine.clock().mockDate(baseTime)

    FliGateway.createEvent('blah', 'blahStory', undefined, undefined).then(() => {
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

  it('calls events endpoint with a default of current time', (done) => {
    Vue.http = () => Promise.resolve({'data': {event: 'some garbage'}})
    spyOn(Vue, 'http').and.callThrough()
    var baseTime = new Date(2016, 1, 23)
    window.jasmine.clock().mockDate(baseTime)

    FliGateway.createEvent('blah', 'blahStory', '', '').then(() => {
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

  it('does not create an event for an event in the future', (done) => {
    FliGateway.createEvent('blah', 'blahStory', '07/08/2999', '13:00').then(response => {
      expect(response.error).toContain('Event must occur in the past')
    }).catch(failTest).then(done)
  })

  it('calls events endpoint with a specified time', (done) => {
    Vue.http = () => Promise.resolve({'data': {event: 'some garbage'}})
    spyOn(Vue, 'http').and.callThrough()
    FliGateway.createEvent('blah', 'blahStory', '07/08/2015', '13:00').then(() => {
      expect(Vue.http).toHaveBeenCalledWith({
        url: 'http://localhost:4567/events',
        method: 'POST',
        data: {
          'eventType': 'blah',
          'occurredAt': '2015-07-08T13:00:00.000Z',
          'story': 'blahStory'
        }
      })
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
    Vue.http = () => Promise.resolve({'data': {'story': {}}})
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
