import $ from 'jquery'
import Vue from 'vue'

export default class TestHarness {
  constructor (AppConstructor) {
    this.root = $('<div><div /></div>')
    this.app = new AppConstructor($('div', this.root)[0])
    $('body').append(this.root)
    this.tail = Promise.resolve()
    window.location.hash = ''
  }

  chain () {
    this.tail = this.tail.then(...arguments).then(() => {
      return new Promise((resolve, reject) => { Vue.nextTick(resolve) })
    })
    return this
  }

  setup () {
    return this.app.start().then(() => {
      return new Promise((resolve, reject) => { Vue.nextTick(resolve) })
    })
  }

  teardown () {
    return new Promise((resolve, reject) => {
      this.chain(() => {
        this.root.remove()
        this.app.router.stop()
        resolve()
      })
    })
  }

  run (test) {
    return this.setup()
    .then(() => test(this))
    .then(() => this.teardown())
  }

  _awaitRouting () {
    return new Promise((resolve, reject) => {
      this.app.router.afterEach(transition => {
        resolve(transition)
      })
    })
  }

  visit (path) {
    return this.chain(() => {
      const currentPath = this.app.router.app.$route.path
      if (path !== currentPath) {
        this.app.router.go(path)
        return this._awaitRouting()
      }
    })
  }

  verify (expectations) {
    return this.chain(() => {
      const scopedJquery = selector => $(selector, this.root)
      expectations(scopedJquery)
    })
  }

  click (selector) {
    return this.chain(() => {
      $(selector, this.root).click()
    })
  }

  verifyRouted (path) {
    return this.chain(() => {
      return this._awaitRouting().then(transition => {
        expect(transition.to.path).toBe(path)
      })
    })
  }

  fillIn (selector, text) {
    return this.chain(() => {
      $(selector, this.root).val(text)
      $(selector, this.root)[0].dispatchEvent(new Event('change', {bubbles: true}))
    })
  }
}
