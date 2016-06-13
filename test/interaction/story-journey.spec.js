import AppDashboard from 'src/app-dashboard'
import TestHarness from 'test/harness'
import * as FliGateway from 'src/services/fli-gateway'

describe('story journey', () => {
  beforeEach(() => FliGateway.clearStubResponses())
  afterEach(() => FliGateway.clearStubResponses())

  it('displays completed text if story has ended', (done) => {
    FliGateway.stub.fetchStory = Promise.resolve({'name': 'whatever', 'ended': true, 'cycleTime': 45})
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/story-journey')
      runner.verify($ => {
        expect($('.story-journey-title').text()).toContain('Story Journey')
        expect($('.story-days-in-progress').text()).toContain('This story completed in 45 days')
      })
    }).then(done)
  })

  it('displays in progress text if story has not yet completed', (done) => {
    FliGateway.stub.fetchStory = Promise.resolve({'name': 'whatever', 'ended': false, 'cycleTime': 4})
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/story-journey')
      runner.verify($ => {
        expect($('.story-journey-title').text()).toContain('Story Journey')
        expect($('.story-days-in-progress').text()).toContain('This story has been in progress for 4 days')
      })
    }).then(done)
  })
})
