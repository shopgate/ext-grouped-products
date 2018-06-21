import { THEME_GMD, THEME_IOS } from '../constants';
import {
  stateWithEmptyResultsByHash,
  stateWithFetchingResultsByHash,
  stateWithResultsByHash,
  expectedResultsByHashEntry,
  expectedProductDataFromResultsByHash,
  stateWithoutCurrentProduct,
  stateWithoutGroupedProducts,
  stateWithoutFlag,
  stateWithGroupedProducts,
} from './index.mock';
import {
  getResultsByHashEntry,
  getGroupedProducts,
  hasGroupedProducts,
  isGroupedProductOrderable,
  isProductOnFavoriteList,
  isMainAddToCartButtonVisible,
} from './index';

describe('Grouped products selectors', () => {
  describe('getResultsByHashEntry()', () => {
    it('should return null when no current product is set', () => {
      const result = getResultsByHashEntry(stateWithoutCurrentProduct);
      expect(result).toBeNull();
    });

    it('should return null when no resultsByHash are available', () => {
      const result = getResultsByHashEntry(stateWithEmptyResultsByHash);
      expect(result).toBeNull();
    });

    it('should return an resultsByHash entry', () => {
      const result = getResultsByHashEntry(stateWithResultsByHash);
      expect(result).toEqual(expectedResultsByHashEntry);
    });
  });

  describe('getGroupedProducts()', () => {
    it('should return an empty array when no current product is set', () => {
      const result = getGroupedProducts(stateWithoutCurrentProduct);
      expect(result).toEqual([]);
    });

    it('should return an empty array when no resultsByHash are available', () => {
      const result = getGroupedProducts(stateWithFetchingResultsByHash);
      expect(result).toEqual([]);
    });

    it('should return an empty array when resultsByHash are fetching', () => {
      const result = getGroupedProducts(stateWithEmptyResultsByHash);
      expect(result).toEqual([]);
    });

    it('should return an array of products when resultsByHash are available', () => {
      const result = getGroupedProducts(stateWithResultsByHash);
      expect(result).toEqual(expectedProductDataFromResultsByHash);
    });
  });

  describe('isGroupedProductOrderable()', () => {
    it('should return false when no props with a productId was passed', () => {
      const result = isGroupedProductOrderable(stateWithResultsByHash);
      expect(result).toBe(false);
    });

    it('should return false when a wrong productId was passed', () => {
      const result = isGroupedProductOrderable(stateWithResultsByHash, { productId: 'foobar' });
      expect(result).toBe(false);
    });

    it('should return false when a productId of a product without stock was passed', () => {
      const result = isGroupedProductOrderable(stateWithResultsByHash, { productId: '1985' });
      expect(result).toBe(false);
    });

    it('should return false when a productId of a not orderable product was passed', () => {
      const result = isGroupedProductOrderable(stateWithResultsByHash, { productId: '1234' });
      expect(result).toBe(false);
    });

    it('should return true when a productId of an orderable product was passed', () => {
      const result = isGroupedProductOrderable(stateWithResultsByHash, { productId: '4711' });
      expect(result).toBe(true);
    });
  });

  describe('hasGroupedProducts()', () => {
    it('should return false when no current product is set', () => {
      const result = hasGroupedProducts(stateWithoutCurrentProduct);
      expect(result).toBe(false);
    });

    it('should return false when the current product has no children', () => {
      const result = hasGroupedProducts(stateWithoutGroupedProducts);
      expect(result).toBe(false);
    });

    it('should return false when the hasChildren flag is not present', () => {
      const result = hasGroupedProducts(stateWithoutFlag);
      expect(result).toBe(false);
    });

    it('should return true when the current product has children', () => {
      const result = hasGroupedProducts(stateWithGroupedProducts);
      expect(result).toBe(true);
    });
  });

  describe('isProductOnFavoriteList()', () => {
    it('should return false when no props with a productId where passed', () => {
      const result = isProductOnFavoriteList(stateWithGroupedProducts);
      expect(result).toBe(false);
    });

    it('should return false when a productId is not on the list', () => {
      const result = isProductOnFavoriteList(stateWithGroupedProducts, { product: '4711' });
      expect(result).toBe(false);
    });

    it('should return true when a product is on the list', () => {
      const result = isProductOnFavoriteList(stateWithGroupedProducts, { productId: '1337' });
      expect(result).toBe(true);
    });
  });

  describe('isMainAddToCartButtonVisible()', () => {
    it('should return true if the gmd theme is active but no grouped products are available', () => {
      global.process.env.THEME = THEME_GMD;
      const result = isMainAddToCartButtonVisible(stateWithoutGroupedProducts);
      expect(result).toBe(true);
    });

    it('should return false if the gmd theme is active and grouped products are available', () => {
      global.process.env.THEME = THEME_GMD;
      const result = isMainAddToCartButtonVisible(stateWithGroupedProducts);
      expect(result).toBe(false);
    });

    it('should return false if the gmd theme is active but no grouped products are available', () => {
      global.process.env.THEME = THEME_IOS;
      const result = isMainAddToCartButtonVisible(stateWithoutGroupedProducts);
      expect(result).toBe(false);
    });

    it('should return false if the gmd theme is active and grouped products are available', () => {
      global.process.env.THEME = THEME_IOS;
      const result = isMainAddToCartButtonVisible(stateWithGroupedProducts);
      expect(result).toBe(false);
    });
  });
});
