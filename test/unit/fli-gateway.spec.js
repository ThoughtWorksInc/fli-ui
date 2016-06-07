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
})
