import Vue from 'vue'
import VueRouter from 'vue-router'
import TestHarness from 'test/harness'

Vue.use(VueRouter)

class MagicApp {
  constructor (root) {
    this.root = root
  }

  start () {
    const App = Vue.extend({
      template: '<router-view></router-view>'
    })
    const Magic = Vue.extend({
      template: `
      <div class="magic">
        <template v-if="more">more</template> magic
      </div>
      <input v-on:click="flip" class="flip-button" type="button" role="button"> flip </input>
      <input v-model="fillInput" type="text" class="fill-input"></input>
      <div class="fill-input-text">{{ fillInput }}</div>
       `,
      data () {
        return {
          more: false,
          fillInput: ''
        }
      },
      methods: {
        flip () {
          this.more = !this.more
        }
      }
    })
    const OtherMagic = Vue.extend({
      template: '<div class="magic">other magic</div>'
    })
    const router = new VueRouter()
    router.map({
      '/': {component: Magic},
      '/magic': {component: OtherMagic}
    })
    this.router = router
    return new Promise((resolve, reject) => router.start(App, this.root, resolve))
  }
}

describe('TestHarness', () => {
  it('starts and stops the application', (done) => {
    const harness = new TestHarness(MagicApp)
    harness.run(() => {
      expect(document.getElementsByClassName('magic').length).toBe(1)
    }).then(() => {
      expect(document.getElementsByClassName('magic').length).toBe(0)
    }).then(done)
  })

  it('does things in the right order', (done) => {
    const orderOfOperations = []

    class MarkerApp {
      constructor (root) { this.root = root }

      start () {
        orderOfOperations.push('start')
        this.router = { stop () { orderOfOperations.push('cleanup') } }
        return Promise.resolve()
      }
    }

    const harness = new TestHarness(MarkerApp)
    harness.run(runner => {
      orderOfOperations.push('setup')
      runner.chain(() => orderOfOperations.push('chained-meat'))
    }).then(() => {
      orderOfOperations.push('post')
      expect(orderOfOperations).toEqual([
        'start',
        'setup',
        'chained-meat',
        'cleanup',
        'post'
      ])
      done()
    })
  })

  it('lets me click things', (done) => {
    const harness = new TestHarness(MagicApp)
    harness.run(runner => {
      runner.verify($ => {
        expect($('.magic').text().trim()).toBe('magic')
      })
      runner.click('.flip-button')
      runner.verify($ => {
        expect($('.magic').text().trim()).toBe('more magic')
      })
    }).then(done)
  })

  it('lets me navigate', (done) => {
    const harness = new TestHarness(MagicApp)
    harness.run(runner => {
      runner.visit('/magic')
      runner.verify($ => {
        expect($('.magic').text().trim()).toBe('other magic')
      })
    }).then(done)
  })

  it('fills in a form element', (done) => {
    const harness = new TestHarness(MagicApp)
    harness.run(runner => {
      runner.fillIn('.fill-input', 'derp')
      runner.verify($ => {
        expect($('.fill-input').val()).toBe('derp')
      })
      runner.verify($ => {
        expect($('.fill-input-text').text().trim()).toBe('derp')
      })
    }).then(done)
  })

  const routingTimeout = 1000
  it('does not cause a timeout after routing if we are already there', (done) => {
    const harness = new TestHarness(MagicApp)
    harness.run(runner => {
      runner.visit('/magic')
      runner.visit('/magic')
    }).then(done)
  }, routingTimeout)

  it('gives vue a chance to do stuff after routing', (done) => {
    class MagicApp {
      constructor (root) { this.root = root }

      start () {
        const App = Vue.extend({ template: '<router-view></router-view>' })
        const ServiceMagic = Vue.extend({
          template: '<div class="magic">{{ junk }}</div>',
          data () { return {junk: ''} },
          ready () { this.junk = 'service magic' }
        })
        this.router = new VueRouter()
        this.router.map({
          '/apage': {component: ServiceMagic}
        })
        return new Promise((resolve, reject) => this.router.start(App, this.root, resolve))
      }
    }
    const harness = new TestHarness(MagicApp)
    harness.run(runner => {
      runner.visit('/apage')
      runner.verify($ => {
        expect($('.magic').text()).toContain('service magic')
      })
    }).then(done)
  })

  it('gives vue a chance to do stuff after starting', (done) => {
    class MagicApp {
      constructor (root) { this.root = root }

      start () {
        const App = Vue.extend({ template: '<router-view></router-view>' })
        const ServiceMagic = Vue.extend({
          template: '<div class="magic">{{ junk }}</div>',
          data () { return {junk: ''} },
          ready () { this.junk = 'service magic' }
        })
        this.router = new VueRouter()
        this.router.map({
          '/': {component: ServiceMagic}
        })
        return new Promise((resolve, reject) => this.router.start(App, this.root, resolve))
      }
    }
    const harness = new TestHarness(MagicApp)
    harness.run(runner => {
      runner.visit('/')
      runner.verify($ => {
        expect($('.magic').text()).toContain('service magic')
      })
    }).then(done)
  })

  it('does not require vue-router', (done) => {
    class MagicApp {
      constructor (root) { this.root = root }

      start () {
        const App = Vue.extend({
          template: '<div class="magic">Hello!</div>'
        })
        return new Promise((resolve, reject) => {
          this.app = new App({el: this.root})
          Vue.nextTick(resolve)
        })
      }
    }
    const harness = new TestHarness(MagicApp)
    harness.run(runner => {
      runner.visit('/')
      runner.chain(() => {
        console.log('visited')
      })
      runner.verify($ => {
        expect($('.magic').text()).toContain('Hello!')
      })
    }).then(done)
  })
})
