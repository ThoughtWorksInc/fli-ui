import AppDashboard from 'src/app-dashboard'
import TestHarness from 'test/harness'

describe('stories list', () => {
  it('navigates to the story journey', (done) => {
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/')
      runner.click('.story-button')
      runner.verifyRouted('/story-journey')
      runner.verify($ => {
        expect($('.story-journey-title').text()).toContain('Story Journey')
      })
    }).then(done)
  })
})
