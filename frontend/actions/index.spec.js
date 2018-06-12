import { mockedPipelineRequestFactory } from '@shopgate/pwa-core/classes/PipelineRequest/mock';
import { logger } from '@shopgate/pwa-core/helpers';
import requestProducts from '@shopgate/pwa-common-commerce/product/action-creators/requestProducts';
import receiveProducts from '@shopgate/pwa-common-commerce/product/action-creators/receiveProducts';
import errorProducts from '@shopgate/pwa-common-commerce/product/action-creators/errorProducts';
import { getCurrentBaseProductId } from '@shopgate/pwa-common-commerce/product/selectors/product';
import {
  stateWithEmptyResultsByHash,
  stateWithFetchingResultsByHash,
} from '../selectors/index.mock';
import { generateHash } from '../helpers';
import { getProductChildren } from './index';

const mockedResolver = jest.fn();
jest.mock(
  '@shopgate/pwa-core/classes/PipelineRequest',
  () => (
    mockedPipelineRequestFactory((mockInstance, resolve, reject) => {
      mockedResolver(mockInstance, resolve, reject);
    })
  )
);

jest.mock('@shopgate/pwa-core/helpers', () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe('Grouped products actions', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProductChildren()', () => {
    it('should not dispatch a pipeline request when data is currently fetching', () => {
      getProductChildren()(dispatch, () => stateWithFetchingResultsByHash);
      expect(mockedResolver).not.toHaveBeenCalled();
    });

    describe('dispatching pipeline requests', () => {
      let state;
      let products;
      let productId;
      let hash;

      beforeAll(() => {
        state = stateWithEmptyResultsByHash;
        products = [{ id: '1337' }, { id: '4711' }];
        productId = getCurrentBaseProductId(state);
        hash = generateHash(productId);
      });

      it('should dispatch a pipeline request when no entry is present within resultsByHash', async () => {
        mockedResolver.mockImplementation((instance, resolve) => {
          resolve({ products });
        });

        await getProductChildren()(dispatch, () => state);

        const [[instance]] = mockedResolver.mock.calls;

        expect(instance.input).toEqual({ productId });
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith(requestProducts({ hash }));
        expect(dispatch).toHaveBeenCalledWith(receiveProducts({
          products,
          hash,
          cached: true,
        }));

        expect(mockedResolver).toHaveBeenCalledTimes(1);
        expect(logger.error).toHaveBeenCalledTimes(0);
      });

      it('should handle pipeline errors as expected', (done) => {
        const error = new Error();

        mockedResolver.mockImplementation((instance, resolve, reject) => {
          reject(error);
        });

        getProductChildren()(dispatch, () => state);

        setTimeout(() => {
          expect(dispatch).toHaveBeenCalledTimes(2);
          expect(dispatch).toHaveBeenLastCalledWith(errorProducts({
            hash,
          }));
          expect(logger.error).toHaveBeenCalledTimes(1);
          expect(logger.error).toHaveBeenCalledWith(error);
          done();
        }, 0);
      });
    });
  });
});
