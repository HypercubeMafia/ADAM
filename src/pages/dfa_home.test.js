import React from 'react';
import ReactDOM from 'react-dom';
import DFAHomePage from './dfa_home';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DFAHomePage />, div);
});
