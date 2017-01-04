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
    },

    singleRun: true,

    browsers: [],

    karmaTypescriptConfig: {
      tsconfig: "./tsconfig.json",
      reports: {
        "html": "coverage",
        "lcovonly": "coverage",
      }
    },
  };

module.exports = function (karma) {
  if (process.env.TRAVIS)
    options.browsers.push('Chrome_travis_ci', 'Firefox', 'PhantomJS')

  if (options.browsers.length === 0)
    options.browsers.push('Chrome', 'Firefox', 'PhantomJS')

  karma.set(options);
};
