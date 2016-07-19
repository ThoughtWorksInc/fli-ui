import AppDashboard from 'src/app-dashboard'
import TestHarness from 'test/harness'
import * as FliGateway from 'src/services/fli-gateway'

describe('story journey', () => {
  beforeEach(() => FliGateway.clearStubResponses())
  afterEach(() => FliGateway.clearStubResponses())

  it('displays completed text if story has ended', (done) => {
    FliGateway.stub.fetchStory = Promise.resolve({'name': 'whatever', 'daysInProgress': 45, 'status': 'Completed'})
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/story-journey')
      runner.verify($ => {
        expect($('.story-days-in-progress').text()).toContain('This story completed in 45 days.')
      })
    }).then(done)
  })

  it('uses proper grammar for stories completed in 1 day', (done) => {
    FliGateway.stub.fetchStory = Promise.resolve({'name': 'whatever', 'daysInProgress': 1, 'status': 'Completed'})
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/story-journey')
      runner.verify($ => {
        expect($('.story-days-in-progress').text()).toContain('This story completed in 1 day.')
      })
    }).then(done)
  })

  it('displays in progress text if story has not yet completed', (done) => {
    FliGateway.stub.fetchStory = Promise.resolve({'name': 'whatever', 'daysInProgress': 4, 'status': 'In Progress'})
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/story-journey')
      runner.verify($ => {
        expect($('.story-days-in-progress').text()).toContain('This story has been in progress for 4 days.')
      })
    }).then(done)
  })

  it('uses proper grammar for stories in progress for 1 day', (done) => {
    FliGateway.stub.fetchStory = Promise.resolve({'name': 'whatever', 'daysInProgress': 1, 'status': 'In Progress'})
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/story-journey')
      runner.verify($ => {
        expect($('.story-days-in-progress').text()).toContain('This story has been in progress for 1 day.')
      })
    }).then(done)
  })

  it('displays to be started text if story has not yet started', (done) => {
    FliGateway.stub.fetchStory = Promise.resolve({'name': 'whatever', 'daysInProgress': 4, 'status': 'To Do'})
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

  it('displays the characteristics for a story', (done) => {
    FliGateway.stub.fetchStory = Promise.resolve(
      {'characteristics': [{'type': 'size', 'value': 'small'}]}
    )
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/story-journey')
      runner.verify($ => {
        expect($('.characteristic__test').text()).toContain('size -- small')
      })
    }).then(done)
  })
})
