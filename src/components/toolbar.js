import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack } from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class ADAMToolbar extends React.Component {
  render() {
      var back_button = null;
      if (this.props.back) {
        back_button = (<IconButton style={{marginLeft: -12,marginRight: 20}}
                        onClick={this.props.back} color="inherit">
          <ArrowBack />
        </IconButton>)
      }

      return (
        <div style={{flexGrow: 1}}>
          <AppBar position="static">
            <Toolbar>
              {back_button}
              <Typography variant="title" color="inherit" style={{marginRight: 50}}>
                {this.props.title}
              </Typography>
              {this.props.btns ? this.props.btns.map(x => (
                <Button color="inherit" onClick = {x.onClick}>
                  {x.body}
                </Button>
              )) : null}
            </Toolbar>
          </AppBar>
        </div>
      );
  }
}

export default ADAMToolbar;
