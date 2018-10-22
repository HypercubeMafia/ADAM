import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import MachineSelectPage from './machine_select';
import Toolbar from '../components/toolbar';
import IconButton from '@material-ui/core/IconButton';

describe('<MachineSelectPage />', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MachineSelectPage />, div);
  });

  it('has a toolbar', function() {
    var page = ReactTestUtils.renderIntoDocument(<MachineSelectPage />);
    var toolbar = ReactTestUtils.findRenderedComponentWithType(page, Toolbar);
  });

  it('does not have a back button in the toolbar', function() {
    var page = ReactTestUtils.renderIntoDocument(<MachineSelectPage />);
    var toolbar = ReactTestUtils.scryRenderedComponentsWithType(page, Toolbar)[0];
    var backs = ReactTestUtils.scryRenderedComponentsWithType(toolbar, IconButton);
    expect(backs).toHaveLength(0);
  });

  //...

});
