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
      const productId = '1337';
      const result = getResultsByHashEntry(stateWithoutCurrentProduct, { productId });
      expect(result).toBeNull();
    });

    it('should return null when no resultsByHash are available', () => {
      const productId = '1337';
      const result = getResultsByHashEntry(stateWithEmptyResultsByHash, { productId });
      expect(result).toBeNull();
    });

    it('should return an resultsByHash entry', () => {
      const productId = '1337';
      const result = getResultsByHashEntry(stateWithResultsByHash, { productId });
      expect(result).toEqual(expectedResultsByHashEntry);
    });
  });

  describe('getGroupedProducts()', () => {
    it('should return an empty array when no current product is set', () => {
      const productId = '';
      const result = getGroupedProducts(stateWithoutCurrentProduct, { productId });
      expect(result).toEqual([]);
    });

    it('should return an empty array when no resultsByHash are available', () => {
      const productId = '1337';
      const result = getGroupedProducts(stateWithFetchingResultsByHash, { productId });
      expect(result).toEqual([]);
    });

    it('should return an empty array when resultsByHash are fetching', () => {
      const productId = '1337';
      const result = getGroupedProducts(stateWithEmptyResultsByHash, { productId });
      expect(result).toEqual([]);
    });

    it('should return an array of products when resultsByHash are available', () => {
      const productId = '1337';
      const result = getGroupedProducts(stateWithResultsByHash, { productId });
      expect(result).toEqual(expectedProductDataFromResultsByHash);
    });
  });

  describe('isGroupedProductOrderable()', () => {
    it('should return false when no props with a productId was passed', () => {
      const productId = '';
      const result = isGroupedProductOrderable(stateWithResultsByHash, { productId });
      expect(result).toBe(false);
    });

    it('should return false when a wrong productId was passed', () => {
      const productId = 'foobar';
      const result = isGroupedProductOrderable(stateWithResultsByHash, { productId });
      expect(result).toBe(false);
    });

    it('should return false when a productId of a product without stock was passed', () => {
      const productId = '1985';
      const result = isGroupedProductOrderable(stateWithResultsByHash, { productId });
      expect(result).toBe(false);
    });

    it('should return false when a productId of a not orderable product was passed', () => {
      const productId = '1234';
      const result = isGroupedProductOrderable(stateWithResultsByHash, { productId });
      expect(result).toBe(false);
    });

    it('should return true when a productId of an orderable product was passed', () => {
      const productId = '1337';
      const result = isGroupedProductOrderable(stateWithResultsByHash, { productId });
      expect(result).toBe(true);
    });
  });

  describe('hasGroupedProducts()', () => {
    it('should return false when no current product is set', () => {
      const productId = '';
      const result = hasGroupedProducts(stateWithoutCurrentProduct, { productId });
      expect(result).toBe(false);
    });

    it('should return false when the current product has no children', () => {
      const productId = '1337';
      const result = hasGroupedProducts(stateWithoutGroupedProducts, { productId });
      expect(result).toBe(false);
    });

    it('should return false when the hasChildren flag is not present', () => {
      const productId = '1337';
      const result = hasGroupedProducts(stateWithoutFlag, { productId });
      expect(result).toBe(false);
    });

    it('should return true when the current product has children', () => {
      const productId = '1337';
      const result = hasGroupedProducts(stateWithGroupedProducts, { productId });
      expect(result).toBe(true);
    });
  });

  describe('isProductOnFavoriteList()', () => {
    it('should return false when no props with a productId where passed', () => {
      const productId = '';
      const result = isProductOnFavoriteList(stateWithGroupedProducts, { productId });
      expect(result).toBe(false);
    });

    it('should return false when a productId is not on the list', () => {
      const productId = '4711';
      const result = isProductOnFavoriteList(stateWithGroupedProducts, { productId });
      expect(result).toBe(false);
    });

    it('should return true when a product is on the list', () => {
      const productId = '1337';
      const result = isProductOnFavoriteList(stateWithGroupedProducts, { productId });
      expect(result).toBe(true);
    });
  });
});
