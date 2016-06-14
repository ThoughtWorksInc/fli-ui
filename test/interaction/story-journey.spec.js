import AppDashboard from 'src/app-dashboard'
import TestHarness from 'test/harness'
import * as FliGateway from 'src/services/fli-gateway'

describe('story journey', () => {
  beforeEach(() => FliGateway.clearStubResponses())
  afterEach(() => FliGateway.clearStubResponses())

  it('displays completed text if story has ended', (done) => {
    FliGateway.stub.fetchStory = Promise.resolve({'name': 'whatever', 'cycleTime': 45, 'status': 'Completed'})
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/story-journey')
      runner.verify($ => {
        expect($('.story-days-in-progress').text()).toContain('This story completed in 45 days')
      })
    }).then(done)
  })

  it('displays in progress text if story has not yet completed', (done) => {
    FliGateway.stub.fetchStory = Promise.resolve({'name': 'whatever', 'cycleTime': 4, 'status': 'In Progress'})
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/story-journey')
      runner.verify($ => {
        expect($('.story-days-in-progress').text()).toContain('This story has been in progress for 4 days')
      })
    }).then(done)
  })

  it('displays to be started text if story has not yet started', (done) => {
    FliGateway.stub.fetchStory = Promise.resolve({'name': 'whatever', 'cycleTime': 4, 'status': 'To Do'})
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/story-journey')
      runner.verify($ => {
        expect($('.story-days-in-progress').text()).toContain('This story has not yet started')
      })
    }).then(done)
  })

  it('displays the events for a story', (done) => {
    FliGateway.stub.fetchStory = Promise.resolve({'events': [{'type': 'kickoff', 'occurredAt': '2015-01-19T02:10:00.000Z'}]})
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/story-journey')
      runner.verify($ => {
        expect($('.event').text()).toContain('1-19-2015 2:10 -- kickoff')
      })
    }).then(done)
  })
})
