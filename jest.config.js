module.exports = {
  rootDir: './src/',
  testMatch: [
    '<rootDir>/**/__tests__/**/*.test.{js,jsx}'
  ],
  moduleNameMapper: {
    '^reforma/(.*)': "<rootDir>/$1"
  }
}
