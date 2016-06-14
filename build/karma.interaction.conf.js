var path = require('path')
var webpackConf = require('./webpack.base.conf')
webpackConf.resolve.alias = {
  'src/services/fli-gateway': path.join(__dirname, '../test/stub-resource'),
  'src/services/google-gateway': path.join(__dirname, '../test/stub-resource'),
  'config': path.resolve(__dirname, '../config', process.env.NODE_ENV),
  'src': path.resolve(__dirname, '../src'),
  'test': path.resolve(__dirname, '../test')
}

delete webpackConf.entry
webpackConf.devtool = '#inline-source-map'

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    reporters: ['spec'],
    files: ['../test/' + config.testType + '/index.js'],
    preprocessors: {
      '../test/**/*.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true
    }
  })
}