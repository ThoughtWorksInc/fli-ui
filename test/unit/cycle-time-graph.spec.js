import CycleTimeGraph from '../../src/components/CycleTimeGraph.vue'
import Vue from 'vue'

describe('Cycle Time Graph', () => {
  it('should search for all groups by default', () => {
    expect(CycleTimeGraph.data().condition).toBe('all')
  })

  it('should intiialize with valid conditions', () => {
    expect(CycleTimeGraph.data().conditionsInvalid).toBeFalsy()
  })

  function componentThatFailsFetchAction () {
    var inject = require('!!vue?inject!../../src/components/CycleTimeGraph.vue')

    var componentWithMocks = inject({
      'src/services/aggregate-cycle-time': {
        clearDataSeries () {},
        drawCycleTime () {}
      },
      'src/services/fli-gateway': {
        fetchGroupsWithCondition () {
          return Promise.reject('blah')
        }
      }
    })

    return componentWithMocks
  }

  function createViewModel (component) {
    var vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': component
      }
    }).$mount()

    return vm
  }

  it('should recognize when invalid conditions are submitted', (done) => {
    var mockedComponent = componentThatFailsFetchAction()
    var viewModel = createViewModel(mockedComponent)

    viewModel.$children[0].drawChart()

    // setting expectation in the future since this is testing and async action
    setTimeout(function () {
      expect(viewModel.$children[0].conditionsInvalid).toBeTruthy()
      done()
    }, 1000)
  })
})
