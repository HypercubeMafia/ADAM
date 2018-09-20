import React from 'react';
import AppBar from '@material-ui/core/AppBar';
//import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import { Link } from 'gatsby';

class ADAMToolbar extends React.Component {
  render() {
      return (
        <div style={{flexGrow: 1}}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit" style={{flexGrow: 1}}>
                {this.props.title}
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      );
  }
}

export default ADAMToolbar;
