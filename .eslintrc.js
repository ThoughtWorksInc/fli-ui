module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    describe: false,
    xdescribe: false,
    fdescribe: false,
    it: false,
    xit: false,
    fit: false,
    expect: false,
    spyOn: false,
    Event: false,
    beforeEach: false,
    afterEach: false
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
