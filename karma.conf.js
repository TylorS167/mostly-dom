const options =
  {
    frameworks: [
      'mocha',
      'karma-typescript',
    ],

    files: [
      { pattern: 'src/**/*.ts' },
    ],

    preprocessors: {
      '**/*.ts': 'karma-typescript',
    },

    reporters: [
      'progress',
      'karma-typescript',
    ],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      },

      Edge: {
        base: 'SauceLabs',
        browserName: 'MicrosoftEdge',
      },

      Safari: {
        base: 'SauceLabs',
        browserName: 'Safari',
      },

      IOS: {
        base: 'SauceLabs',
        browserName: 'iphone',
      },

      Android: {
        base: 'SauceLabs',
        browserName: 'Android'
      }
    },

    singleRun: true,

    browsers: [],

    karmaTypescriptConfig: {
      reports: {
        "html": "coverage",
        "lcovonly": "coverage",
      }
    },

    sauceLabs: {
      testName: 'Mostly DOM',
      recordVideo: true,
    }
  };

module.exports = function (karma) {
  if (process.env.UNIT)
    options.browsers.push('PhantomJS')

  if (process.env.TRAVIS)
    options.browsers.push('Chrome_travis_ci', 'Firefox')

  if (process.env.SAUCE) {
    options.browsers.push('Edge', 'Safari', 'IOS', 'Android')
    options.reporters.push('saucelabs')
  }

  if (options.browsers.length === 0)
    options.browsers.push('Chrome', 'Firefox')

  karma.set(options);
};
