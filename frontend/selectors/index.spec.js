import {
  stateWithEmptyResultsByHash,
  stateWithFetchingResultsByHash,
  stateWithResultsByHash,
  expectedResultsByHashEntry,
  expectedProductDataFromResultsByHash,
  stateWithoutCurrentProduct,
  stateWithoutChildren,
  stateWithoutFlag,
  stateWithChildren,
} from './index.mock';
import {
  getResultsByHashEntry,
  getGroupedProducts,
  hasGroupedProducts,
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

  describe('hasGroupedProducts()', () => {
    it('should return false when no current product is set', () => {
      const result = hasGroupedProducts(stateWithoutCurrentProduct);
      expect(result).toBe(false);
    });

    it('should return false when the current product has no children', () => {
      const result = hasGroupedProducts(stateWithoutChildren);
      expect(result).toBe(false);
    });

    it('should return false when the hasChildren flag is not present', () => {
      const result = hasGroupedProducts(stateWithoutFlag);
      expect(result).toBe(false);
    });

    it('should return true when the current product has children', () => {
      const result = hasGroupedProducts(stateWithChildren);
      expect(result).toBe(true);
    });
  });
});
