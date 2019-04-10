import { productChildrenReceived$ } from './index';
import { RECEIVED_PRODUCT_CHILDREN } from '../constants';

describe('productChildrenReceived$', () => {
  it(`should return true for ${RECEIVED_PRODUCT_CHILDREN}`, () => {
    expect(productChildrenReceived$
      .operator
      .predicate({ action: { type: RECEIVED_PRODUCT_CHILDREN } }))
      .toBe(true);
  });
  it('should return for other types', () => {
    expect(productChildrenReceived$.operator.predicate({ action: { type: 'foo' } })).toBe(false);
  });
});
