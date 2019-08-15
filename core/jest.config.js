module.exports = {
  verbose: true,

  setupFilesAfterEnv: [
    '<rootDir>/test/jestSetup.js'
  ],

  testMatch: [
      '**/__tests__/**/*.test.js'
  ]
}
