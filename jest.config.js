module.exports = {
  rootDir: '.',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.{js,jsx}'
  ],
  moduleNameMapper: {
    '^reforma/(.*)': '<rootDir>/src/$1',
    '^Test/(.*)': '<rootDir>/test/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/test/jest-setup.js']
}
