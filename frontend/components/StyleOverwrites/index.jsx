import React from 'react';

import sheetStyles from '@shopgate/pwa-ui-shared/Sheet/style';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables } = themeConfig;

/**
 * The StyleOverwrites components is supposed to
 * extend and overwrite theme component classes.
 * @return {JSX}
 */
const StyleOverwrites = () => (
  <style>
    {`
.${sheetStyles.container} { border-radius: 10px 10px 0 0; }
.${sheetStyles.content} { max-height: calc(100vh - ${variables.navigator.height + 15}px - var(--safe-area-inset-top)); }
    `}
  </style>
);

export default StyleOverwrites;
