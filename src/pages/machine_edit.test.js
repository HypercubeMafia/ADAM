import React from 'react';
import ReactDOM from 'react-dom';
import MachineEditPage from './machine_edit';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MachineEditPage />, div);
});
