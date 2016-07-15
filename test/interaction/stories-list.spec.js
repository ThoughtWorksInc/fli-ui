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

  it('shows only In Progress stories by default', (done) => {
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/')
      runner.verify($ => {
        expect($('#stories-body__test tr').length).toBe(1)
        $('#stories-body__test tr').each(function () {
          expect($(this).find('#status-cell__test').text()).toContain('In Progress')
        })
      })
    }).then(done)
  })

  it('shows all stories when checkbox clicked', (done) => {
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/')
      runner.click('#show-all__test')
      runner.verify($ => {
        expect($('#stories-body__test tr').length).toBe(2)
      })
    }).then(done)
  })

  it('shows only In Progress when unchecked', (done) => {
    const harness = new TestHarness(AppDashboard)
    harness.run(runner => {
      runner.visit('/')
      runner.click('#show-all__test')
      runner.verify($ => {
        expect($('#stories-body__test tr').length).toBe(2)
      })
      runner.click('#show-all__test')
      runner.verify($ => {
        expect($('#stories-body__test tr').length).toBe(1)
      })
    }).then(done)
  })
})
