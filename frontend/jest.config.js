const jestConfig = require('@shopgate/pwa-unit-test/jest.config');

module.exports = {
  ...jestConfig,
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@shopgate/pwa-core|@shopgate/pwa-common|@shopgate/pwa-common-commerce|@shopgate/pwa-ui-ios|@shopgate/pwa-ui-material|@shopgate/pwa-ui-shared|css-spring)/).+\\.js$',
  ],
  setupFiles: [
    ...jestConfig.setupFiles,
  ],
};
