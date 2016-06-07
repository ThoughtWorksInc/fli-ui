import AppDashboard from 'src/app-dashboard'
import TestHarness from 'test/harness'

describe('adding an event', () => {
  it('displays the newly added event', (done) => {
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/')
      runner.fillIn('.event-type-input', 'kickoff')
      runner.fillIn('.story-number-input', 'test-1')
      runner.click('.add-event-button')
      runner.verify($ => {
        expect($('.newly-added-event-text').text()).toContain('Event added!')
      })
    }).then(done)
  })
})
