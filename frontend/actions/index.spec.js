import { mockedPipelineRequestFactory } from '@shopgate/pwa-core/classes/PipelineRequest/mock';
import { getProductChildren } from './index';
import { generateHash } from '../helpers';

// eslint-disable-next-line require-jsdoc
let mockedPipelineRequestResolver = () => {};
jest.mock('@shopgate/pwa-core/classes/PipelineRequest', () => mockedPipelineRequestFactory((...args) => {
  mockedPipelineRequestResolver(...args);
}));

const mockedErrorLogSpy = jest.fn();
jest.mock('@shopgate/pwa-core/helpers', () => ({
  logger: {
    error: (...args) => mockedErrorLogSpy(...args),
  },
}));

describe('actions', () => {
  const dispatch = jest.fn();
  const hash = generateHash('foo');
  const state = {
    product: {
      productsById: {
        foo: {
          productData: {
            id: 'foo',
          },
        },
      },
      resultsByHash: {
        [hash]: {
          expires: undefined,
          isFetching: undefined,
        },
      },
    },
  };
  // eslint-disable-next-line require-jsdoc
  const getState = () => state;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProductChildren', () => {
    it('should do nothing when data is cached', () => {
      state.product.resultsByHash[hash].expires = Date.now() + 1000;
      state.product.resultsByHash[hash].isFetching = false;
      getProductChildren('foo')(dispatch, getState);
      expect(dispatch).not.toHaveBeenCalled();
    });

    it('should call the pipeline and resolve', (done) => {
      state.product.resultsByHash[hash].expires = 0;
      state.product.resultsByHash[hash].isFetching = false;
      let request;
      mockedPipelineRequestResolver = (r, resolve) => {
        request = r;
        resolve({ products: {} });
      };
      getProductChildren('foo')(dispatch, getState);
      expect(dispatch).toHaveBeenCalledTimes(2);
      setTimeout(() => {
        expect(request.name).toBe('shopgate.catalog.getProductChildren');
        expect(request.input).toEqual({
          productId: 'foo',
        });
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(mockedErrorLogSpy).not.toHaveBeenCalled();
        done();
      }, 0);
    });
  });

  it('should call the pipeline and reject', (done) => {
    state.product.resultsByHash[hash].expires = 0;
    state.product.resultsByHash[hash].isFetching = false;
    let request;
    mockedPipelineRequestResolver = (r, resolve, reject) => {
      request = r;
      reject();
    };
    getProductChildren('foo')(dispatch, getState);
    expect(dispatch).toHaveBeenCalledTimes(2);
    setTimeout(() => {
      expect(request.name).toBe('shopgate.catalog.getProductChildren');
      expect(request.input).toEqual({
        productId: 'foo',
      });
      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(mockedErrorLogSpy).toHaveBeenCalled();
      done();
    }, 0);
  });
});
