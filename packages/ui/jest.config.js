module.exports = {
  verbose: true,
  setupFilesAfterEnv: [
    '<rootDir>/test/jestSetup.js'
  ],
  testMatch: [
    '<rootDir>/src/**/*.test.js'
  ]
}
