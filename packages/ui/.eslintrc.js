module.exports = {
  env: {
    'jest/globals': true
  },
  parser: 'babel-eslint',
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  plugins: ['jest', 'babel', 'react'],
  settings: {
    react: {
      version: '16.9'
    }
  },
  rules: {
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    // use babel/no-unused-expressions which includes do expressions
    // https://github.com/babel/eslint-plugin-babel/pull/131
    'babel/no-unused-expressions': 'error',
    'no-unused-expressions': 'off',
    'no-new': 'off',
    'react/display-name': 'off'
  }
}
