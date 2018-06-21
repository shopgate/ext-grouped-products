import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import { createWrappedComponent } from '../mockStore';
import { mockedState } from '../mock';
import { THEME_GMD } from '../../constants';
import GroupedProducts from './index';

/**
 * Creates a component with a provided store state.
 * @param {Object} state A mocked state.
 * @return {ReactWrapper}
 */
const createComponent = state => createWrappedComponent(GroupedProducts, state);

describe('<GroupedProducts />', () => {
  beforeEach(() => {
    global.process.env.THEME = THEME_GMD;
  });

  it('should not render when no grouped products are available', () => {
    const state = set(cloneDeep(mockedState), ['product', 'resultsByHash'], {});
    const component = createComponent(state);
    expect(component).toMatchSnapshot();
    expect(component.find('GroupedProducts').html()).toBe(null);
  });

  it('should render when grouped products are available', () => {
    const component = createComponent(mockedState);
    expect(component).toMatchSnapshot();
    expect(component.find('ListItem')).toHaveLength(5);
  });
});
