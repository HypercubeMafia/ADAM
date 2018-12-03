import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Comment from './comment';

describe('<Comment />', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Comment
      comment={{com:"test", x:0, y:0}}
      onClick={()=>None}
      onDragEnd={()=>None}
    />, div);
  });

  it('processes a click', () => {
    let clicked = false
    let handleClick = () => {clicked=true;};

    const div = document.createElement('div');
    ReactDOM.render(<Comment
      comment={{com:"test", x:0, y:0}}
      onClick={handleClick}
      onDragEnd={()=>None}
    />, div);

    let comment = div.children[0].children[0];
    ReactTestUtils.Simulate.click(comment);
    expect(clicked).toBeTruthy();
  });

});
