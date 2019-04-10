import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mockedPipelineRequestFactory } from '@shopgate/pwa-core/classes/PipelineRequest/mock';
import { shouldFetchData } from '@shopgate/pwa-common/helpers/redux';
import requestProducts from '@shopgate/pwa-common-commerce/product/action-creators/requestProducts';
import { stateWithResultsByHash } from '../selectors/mock';
import { getProductChildren } from './index';
import { requestProductChildren } from '../action-creators';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let mockedResolver;
jest.mock(
  '@shopgate/pwa-core/classes/PipelineRequest',
  () => (
    mockedPipelineRequestFactory((mockInstance, resolve, reject) => {
      mockedResolver(mockInstance, resolve, reject);
    })
  )
);

jest.mock('@shopgate/pwa-common/helpers/redux', () => ({
  shouldFetchData: jest.fn().mockReturnValue(() => true),
  generateResultHash: jest.fn(),
}));

jest.mock('../action-creators', () => ({
  receivedProductChildren: jest.fn(() => ({ type: 'receivedProductChildren' })),
  requestProductChildren: jest.fn(() => ({ type: 'requestProductChildren' })),
  errorNoProductChildren: jest.fn(),
}));

jest.mock('@shopgate/pwa-common-commerce/product/action-creators/requestProducts', () =>
  jest.fn(() => ({ type: 'request' })));
jest.mock('@shopgate/pwa-core/helpers', () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe('getProductChildren', () => {
  it('should call shouldFetchDate', () => {
    const store = mockStore(stateWithResultsByHash);
    store.dispatch(getProductChildren());
    expect(shouldFetchData).toHaveBeenCalled();
  });
  it('should call requestProductChildren', () => {
    const store = mockStore(stateWithResultsByHash);
    store.dispatch(getProductChildren());
    expect(requestProductChildren).toHaveBeenCalled();
  });
  it('should call requestProducts', () => {
    const store = mockStore(stateWithResultsByHash);
    store.dispatch(getProductChildren());
    expect(requestProducts).toHaveBeenCalled();
  });
  it('should dispatch a pipeline', () => {
    const mockedDispatch = jest.fn();
    mockedResolver = (mockInstance, resolve) => {
      resolve();
    };
    getProductChildren('1337')(mockedDispatch, () => stateWithResultsByHash);
    expect(mockedDispatch).toHaveBeenCalled();
  });
  it('should dispatch a pipeline and catch', () => {
    const mockedDispatch = jest.fn();
    mockedResolver = (mockInstance, reject) => {
      reject();
    };
    getProductChildren('1337')(mockedDispatch, () => stateWithResultsByHash);
    expect(mockedDispatch).toHaveBeenCalled();
  });
});
