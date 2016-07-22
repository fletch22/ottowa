const webpackConfig = require('./webpack.config.js');

const TorontoKarmaConfig = function TorontoKarmaConfig(config) {
  config.set({
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],
    // list of files / patterns to load in the browser
    files: [
      './node_modules/whatwg-fetch/fetch.js'
    ],
    // list of files to exclude
    exclude: [
    ],
    plugins: [
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chai',
      'karma-sinon'
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/stylesheets/scss/base.scss': ['webpack']
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'], //, 'PhantomJS', ],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
  if (config.EXECUTE_INTEGRATION_TESTS) {
    console.log('Running INTEGRATION tests only ...');
    config.files.push({ pattern: 'app/__integration_tests__/test-context.js', watched: false });
    config.preprocessors['app/__integration_tests__/test-context.js'] = ['webpack'];
  } else {
    console.log('Running UNIT tests only ...');
    config.files.push({ pattern: 'app/__tests__/test-context.js', watched: false });
    config.preprocessors['app/__tests__/test-context.js'] = ['webpack'];
  }
};


module.exports = TorontoKarmaConfig;

