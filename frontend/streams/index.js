import { main$ } from '@shopgate/pwa-common/streams/main';
import { RECEIVED_PRODUCT_CHILDREN } from '../constants';

export const productChildrenReceived$ = main$
  .filter(({ action }) => action.type === RECEIVED_PRODUCT_CHILDREN);
