const jestConfig = require('@shopgate/pwa-unit-test/jest.config');

module.exports = {
  ...jestConfig,
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    '*/**/*.{js|jsx}',
    '!*/**/.eslintrc.js',
    '!*/**/jest.config.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  transformIgnorePatterns: [
    '/node_modules/',
  ],
};
