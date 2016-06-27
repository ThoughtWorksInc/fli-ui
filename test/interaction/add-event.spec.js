import AppDashboard from 'src/app-dashboard'
import TestHarness from 'test/harness'
import Vue from 'vue'
import * as FliGateway from 'src/services/fli-gateway'

describe('adding an event', () => {
  it('displays the newly added event', (done) => {
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/')
      runner.fillIn('.event-type-input', 'kickoff')
      runner.fillIn('.story-number-input', 'test-1')
      runner.click('.add-event-button')
      Vue.nextTick(() => {
        runner.verify($ => {
          expect($('.newly-added-event-text').text()).toContain('Event added')
        })
      })
    }).then(done)
  })

  it('displays an error message if event creation fails', (done) => {
    FliGateway.stub.createEvent = Promise.resolve({'error': 'uh oh'})
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/')
      runner.fillIn('.event-type-input', 'kickoff')
      runner.fillIn('.story-number-input', 'test-1')
      runner.click('.add-event-button')
      runner.verify($ => {
        expect($('.failure-text').text()).toContain('uh oh')
      })
    }).then(done)
  })
})
