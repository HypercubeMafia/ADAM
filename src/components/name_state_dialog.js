import React from "react";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

class NameStateDialog extends React.Component {

  state = {
    name: "",
    hintText: ""
  }

  componentWillReceiveProps = () => {
    this.setState({name: this.props.name});
  }

  textField = () => (
    <TextField
      helperText={this.state.hintText}
      error={this.state.hintText.length > 0}
      autoFocus
      margin="dense"
      label="State Name"
      type="string"
      value={this.state.name}
      onChange={e => this.setState(
        { name: e.target.value, hintText: this.props.validate(e.target.value).helperText }
      )}
      onKeyPress={(ev) => {
        if (ev.key === 'Enter') {
          this.onSubmit();
          ev.preventDefault();
        }
      }}
      fullWidth
    />
  );

  onSubmit = () => {
    if (this.props.validate(this.state.name).canSubmit) {
      this.props.onSubmit(this.state.name);
    }
  }

  render() {
    return (
      <Dialog
          open={this.props.isOpen}
          onClose={this.props.onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Change Name</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the name of the state.
            </DialogContentText>
            {this.textField()}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}

export default NameStateDialog;
