import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

class CommentDialog extends React.Component {

  state = {
    commentText: "",
    hintText: ""
  }

  textField = () => (
    <TextField
      helperText={this.state.hintText}
      error={this.state.hintText.length > 0}
      autoFocus
      margin="dense"
      label="Comment"
      type="string"
      defaultValue={this.props.def}
      onChange={e => this.setState(
        { commentText: e.target.value, hintText: this.buildHintText(e.target.value) }
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

  buildHintText = commentText => {
    if (commentText === "") {
      return "Please enter a comment.";
    } else {
      return "";
    }
  }


  onSubmit = () => {
    var h = this.buildHintText(this.state.commentText);
    if (h === "") {
      this.props.update(this.state.commentText);
      this.props.onClose();
    } else {
      this.setState(
        (prevState, props) => {
          return { commentText: prevState.commentText,
                   hintText: h };
        }
      );
    }
  }

  render() {
    return (
      <Dialog
          open={this.props.isOpen}
          onClose={this.props.onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Comment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter comment text
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

export default CommentDialog;
