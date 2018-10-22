import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import State from './state';

describe('<State />', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<State
      state={{name:"name",x:1,y:1}}
      size={{width:10,height:10}}
      clicked={false}
      start={false}
      onClick={()=>null}
      onDragEnd={()=>null}
    />, div);
  });

  it('processes a click', () => {
    let clicked = false
    let handleClick = () => {clicked=true;};

    const div = document.createElement('div');
    ReactDOM.render(<State
      state={{name:"name",x:1,y:1}}
      size={{width:10,height:10}}
      clicked={false}
      start={false}
      onClick={handleClick}
      onDragEnd={()=>null}
    />, div);

    let state = div.children[0].children[0];
    ReactTestUtils.Simulate.click(state);
    expect(clicked).toBeTruthy();
  });

});
