import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Transition from './transition';

describe('<Transition />', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Transition
      transition={{txt:"test"}}
      src={{state:{x:0,y:0}, loc:"N"}}
      dest={{state:{x:0,y:0}, loc:"N"}}
      start={false}
      onClick={()=>null}
    />, div);
  });

  it('processes a click', () => {
    let clicked = false
    let handleClick = () => {clicked=true;};

    const div = document.createElement('div');
    ReactDOM.render(<Transition
      transition={{txt:"test"}}
      src={{state:{x:0,y:0}, loc:"N"}}
      dest={{state:{x:0,y:0}, loc:"N"}}
      start={false}
      onClick={handleClick}
    />, div);

    let transition = div.children[0].children[0];
    ReactTestUtils.Simulate.click(transition);
    expect(clicked).toBeTruthy();
  });

});
