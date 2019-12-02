const jestConfig = require('@shopgate/pwa-unit-test/jest.config');

module.exports = {
  ...jestConfig,
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  setupFiles: [
    ...jestConfig.setupFiles,
  ],
};
