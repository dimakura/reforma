module.exports = {
  rootDir: '.',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.{js,jsx}'
  ],
  moduleNameMapper: {
    '^reforma/(.*)': '<rootDir>/src/$1',
    '^Test/(.*)': '<rootDir>/test/$1'
  },
  setupTestFrameworkScriptFile: '<rootDir>/test/jest-setup.js'
}
