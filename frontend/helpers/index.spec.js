import { generateResultHash } from '@shopgate/pwa-common/helpers/redux';
import { SHOPGATE_CATALOG_GET_PRODUCT_CHILDREN, THEME_GMD, THEME_IOS } from '../constants';
import {
  generateHash,
  createPickerItems,
  renderFlatButtons,
  hasFavorites,
} from './index';

import {
  mockedProduct,
  mockedIgnoredQuantityProduct,
} from '../components/mock';

jest.mock('../config', () => ({
  maxQuantityPickerEntries: 5,
}));

let mockedHasFavorites = true;

jest.mock('@shopgate/pwa-common/helpers/config', () => ({
  get hasFavorites() { return mockedHasFavorites; },
}));

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

  describe('createPickerItems()', () => {
    it('should return an empty array when no stock object is passed', () => {
      const result = createPickerItems();
      expect(result).toEqual([]);
    });

    it('should return five items when the quantity can be ignored', () => {
      const { stock } = mockedIgnoredQuantityProduct;
      const result = createPickerItems(stock);

      expect(result).toHaveLength(5);
      expect(result[0]).toEqual({
        label: '1',
        value: 1,
      });
      expect(result[4]).toEqual({
        label: '5',
        value: 5,
      });
    });

    it('should return four items when the quantity can not be ignored', () => {
      const { stock } = mockedProduct;
      const result = createPickerItems(stock);

      expect(result).toHaveLength(4);
      expect(result[0]).toEqual({
        label: '1',
        value: 1,
      });
      expect(result[3]).toEqual({
        label: '4',
        value: 4,
      });
    });
  });

  describe('renderFlatButtons()', () => {
    it('should return false at gmd', () => {
      global.process.env.THEME = THEME_IOS;
      expect(renderFlatButtons()).toBe(true);
    });

    it('should return true at ios', () => {
      global.process.env.THEME = THEME_GMD;
      expect(renderFlatButtons()).toBe(false);
    });
  });

  describe('hasFavorites()', () => {
    it('should return true when the config setting is set to true', () => {
      expect(hasFavorites()).toBe(true);
    });

    it('should return false when the config setting is set to false', () => {
      mockedHasFavorites = false;
      expect(hasFavorites()).toBe(false);
    });
  });
});
