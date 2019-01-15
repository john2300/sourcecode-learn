// Karma configuration
// Generated on Tue Jan 01 2019 21:36:38 GMT+0800 (China Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    //基本路径
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    //断言库测试框架 BDD
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    //匹配文件格式或者模式
    files: [
      '*.js'
      // 'index.js'
    ],


    // list of files / patterns to exclude
    //排除不测试的文件
    exclude: [

    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    //配置测试报表 覆盖率
    preprocessors: {

    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    //生成报表
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    //是否独立运行,原来是false,现在改为true,需要独立地运行在PhantomJS无头浏览器里
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
