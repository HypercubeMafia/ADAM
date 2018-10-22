import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Toolbar from './toolbar';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

describe('<Toolbar />', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Toolbar />, div);
  });

  it('shows its title', () => {
    var toolbar = ReactTestUtils.renderIntoDocument(<Toolbar title="banana" />);
    var title = ReactTestUtils.findRenderedComponentWithType(toolbar, Typography);
    expect(title.props.children).toEqual("banana");
  });

  it('does not have a back button by default', () => {
    var toolbar = ReactTestUtils.renderIntoDocument(<Toolbar />);
    var backs = ReactTestUtils.scryRenderedComponentsWithType(toolbar, IconButton);
    expect(backs).toHaveLength(0);
  });

  it('has a functional back button when specified', () => {
    var toolbar = ReactTestUtils.renderIntoDocument(<Toolbar back={() => "functional"}/>);
    var back = ReactTestUtils.findRenderedComponentWithType(toolbar, IconButton);
    expect(back.props.onClick()).toEqual("functional");
  });

  it('creates the correct number of additional buttons', () => {
    var buttons2 = [{body:"1", onClick:()=>null}, {body:"2", onClick:()=>null}]
    var toolbar2 = ReactTestUtils.renderIntoDocument(<Toolbar btns={buttons2} />);
    var b2 = ReactTestUtils.scryRenderedComponentsWithType(toolbar2, Button);
    expect(b2).toHaveLength(2);

    var buttons3 = [{body:"1", onClick:()=>null}, {body:"2", onClick:()=>null}, {body:"3", onClick:()=>null}]
    var toolbar3 = ReactTestUtils.renderIntoDocument(<Toolbar btns={buttons3} />);
    var b3 = ReactTestUtils.scryRenderedComponentsWithType(toolbar3, Button);
    expect(b3).toHaveLength(3);
  });

  it('labels buttons correctly', () => {
    var button = [{body:"grapefruit", onClick:()=>null}]
    var toolbar = ReactTestUtils.renderIntoDocument(<Toolbar btns={button} />);
    var b = ReactTestUtils.findRenderedComponentWithType(toolbar, Button);
    expect(b.props.children).toEqual("grapefruit");
  });

  it('correctly associates actions with buttons', () => {
    var button = [{body:"1", onClick:()=>"success"}]
    var toolbar = ReactTestUtils.renderIntoDocument(<Toolbar btns={button} />);
    var b = ReactTestUtils.findRenderedComponentWithType(toolbar, Button);
    expect(b.props.onClick()).toEqual("success");
  });

});
