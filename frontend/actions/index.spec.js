import { mockedPipelineRequestFactory } from '@shopgate/pwa-core/classes/PipelineRequest/mock';
import { getProductChildren } from './index';

// eslint-disable-next-line require-jsdoc
let mockedPipelineRequestResolver = () => {};
jest.mock('@shopgate/pwa-core/classes/PipelineRequest', () => mockedPipelineRequestFactory((...args) => {
  mockedPipelineRequestResolver(...args);
}));

jest.mock('../selectors', () => ({
  getResultsByHashEntry: () => {},
}));

const mockedErrorLogSpy = jest.fn();
jest.mock('@shopgate/pwa-core/helpers', () => ({
  logger: {
    error: (...args) => mockedErrorLogSpy(...args),
  },
}));

let mockedShouldFetchDataResult = false;
jest.mock('@shopgate/pwa-common/helpers/redux', () => ({
  shouldFetchData: () => mockedShouldFetchDataResult,
  generateResultHash: () => 'hash',
}));

describe('actions', () => {
  const dispatch = jest.fn();
  // eslint-disable-next-line require-jsdoc
  const getState = () => ({});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProductChildren', () => {
    it('should do nothing when data is cached', () => {
      mockedShouldFetchDataResult = false;
      getProductChildren(1)(dispatch, getState);
      expect(dispatch).not.toHaveBeenCalled();
    });

    it('should call the pipeline and resolve', (done) => {
      mockedShouldFetchDataResult = true;
      let request;
      mockedPipelineRequestResolver = (r, resolve) => {
        request = r;
        resolve({ products: {} });
      };
      getProductChildren(1)(dispatch, getState);
      expect(dispatch).toHaveBeenCalledTimes(2);
      setTimeout(() => {
        expect(request.name).toBe('shopgate.catalog.getProductChildren');
        expect(request.input).toEqual({
          productId: 1,
        });
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(mockedErrorLogSpy).not.toHaveBeenCalled();
        done();
      }, 0);
    });
  });

  it('should call the pipeline and reject', (done) => {
    mockedShouldFetchDataResult = true;
    let request;
    mockedPipelineRequestResolver = (r, resolve, reject) => {
      request = r;
      reject();
    };
    getProductChildren(1)(dispatch, getState);
    expect(dispatch).toHaveBeenCalledTimes(2);
    setTimeout(() => {
      expect(request.name).toBe('shopgate.catalog.getProductChildren');
      expect(request.input).toEqual({
        productId: 1,
      });
      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(mockedErrorLogSpy).toHaveBeenCalled();
      done();
    }, 0);
  });
});
