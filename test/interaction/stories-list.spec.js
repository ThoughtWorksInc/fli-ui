import AppDashboard from 'src/app-dashboard'
import TestHarness from 'test/harness'

describe('stories list', () => {
  it('navigates to the story odyssey', (done) => {
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/')
      runner.click('.story-button')
      runner.verifyRouted('/story-odyssey')
      runner.verify($ => {
        expect($('.story-odyssey-title').text()).toContain('Story Odyssey')
      })
    }).then(done)
  })
})
