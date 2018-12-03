import React from 'react';
import ReactDOM from 'react-dom';
import MachineCanvas from './machine_canvas';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MachineCanvas machine={{transitions:[], states:[], comments:[]}}/>, div);
});
