import CycleTimeGraph from '../../src/components/CycleTimeGraph.vue'
import Vue from 'vue'

describe('Cycle Time Graph', () => {
  it('should search for all groups by default', () => {
    expect(CycleTimeGraph.data().condition).toBe('all')
  })

  it('should intiialize with valid conditions', () => {
    expect(CycleTimeGraph.data().conditionsInvalid).toBeFalsy()
  })

  it('should recognize when invalid conditions are submitted', (done) => {
    var inject = require('!!vue?inject!../../src/components/CycleTimeGraph.vue')

    var clearDataMethod = jasmine.createSpy('clearDataMethod')
    var drawCycleTimeMethod = jasmine.createSpy('drawCycleTime')

    var componentWithMock = inject({
      'src/services/aggregate-cycle-time': {
        clearDataSeries () {
          clearDataMethod()
        },
        drawCycleTime () {
          drawCycleTimeMethod()
        }
      },
      'src/services/fli-gateway': {
        fetchGroupsWithCondition () {
          return Promise.reject('blah')
        }
      }

    })

    const vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': componentWithMock
      }
    }).$mount()

    vm.$children[0].drawChart()

    setTimeout(function () {
      expect(vm.$children[0].conditionsInvalid).toBeTruthy()
      done()
    }, 1000)
  })
})
