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
          url: 'http://localhost:4567/api/events',
          method: 'POST',
          data: {
            'event_type': 'blah',
            'occurred_at': baseTime.toISOString(),
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
          url: 'http://localhost:4567/api/groups?conditions=with%20kickoff',
          method: 'GET'
        }
      )
    }).catch(failTest).then(done)
  })

  it('gets all stories', (done) => {
    Vue.http = () => Promise.resolve({'data': {'stories': [{'name': 'blah name'}]}})
    spyOn(Vue, 'http').and.callThrough()

    FliGateway.fetchStories().then(() => {
      expect(Vue.http).toHaveBeenCalledWith(
        {
          url: 'http://localhost:4567/api/stories',
          method: 'GET'
        }
      )
    }).catch(failTest).then(done)
  })
})
