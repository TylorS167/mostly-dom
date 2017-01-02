module.exports =
  {
    plugins: [ 'northbrook/plugins', 'tslint', 'tsc' ],

    tsc: {
      es2015: true,
      patterns: [
        'src/**/*.ts',
        '!src/**/*.test.ts',
      ],
    },

    tslint: {
      patterns: [
        'src/**/*.ts',
      ],
    },
  };
