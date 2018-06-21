import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockRenderOptions from '@shopgate/pwa-common/helpers/mocks/mockRenderOptions';

/**
 * Creates a component instance which is wrapped by a store.
 * @param {JSX} Component The components to render.
 * @param {Object} state A mocked state.
 * @param {Object} [props={}] Component props.
 * @param {Function} [dispatch=null] An optional replacement for the dispatch method.
 * @return {ReactWrapper}
 */
export const createWrappedComponent = (Component, state, props = {}, dispatch = null) => {
  const store = configureStore([thunk])(state);

  if (dispatch) {
    store.dispatch = dispatch;
  }

  return mount(
    <Provider store={store}>
      <Component {...props} />
    </Provider>,
    mockRenderOptions
  );
};
