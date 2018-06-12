import { generateResultHash } from '@shopgate/pwa-common/helpers/redux';
import { SHOPGATE_CATALOG_GET_PRODUCT_CHILDREN } from '../constants';
import { generateHash } from './index';

describe('Grouped products helpers', () => {
  describe('generateHash()', () => {
    it('should generate the hash as expected', () => {
      const productId = '1337';
      const expected = generateResultHash({
        pipeline: SHOPGATE_CATALOG_GET_PRODUCT_CHILDREN,
        productId,
      });

      const result = generateHash(productId);
      expect(result).toEqual(expected);
    });
  });
});
