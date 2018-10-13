import React from 'react';

import ADAMToolbar from '../components/toolbar.js';
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
