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

const styles = {
  card: {
    width: 200
  },
  preview_pane: {
    marginBottom: 100,
    fontSize: 14
  },
  banner: {
    paddingTop: 0,
    paddingBottom: 0
  },
  option: {
    marginLeft: "auto"
  }
};

var MachineColors = { dfa: "#7e57c2", nfa: "#ffa726", tm: "#42a5f5" };

class DuplicateDialog extends React.Component {

  state = {
    name: "",
    hintText: ""
  }

  textField = () => (
    <TextField
      helperText={this.state.hintText}
      error={this.state.hintText.length > 0}
      autoFocus
      margin="dense"
      label="Machine Name"
      type="string"
      onChange={e => this.setState(
        { name: e.target.value, hintText: this.buildHintText(e.target.value) }
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

  buildHintText = name => {
    if (name === "") {
      return "Please enter a machine name.";
    } else if (this.props.machines.some(machine => machine.title.toLowerCase() === name.toLowerCase())) {
      return "This name is already in use.";
    } else {
      return "";
    }
  }

  onSubmit = () => {
    var h = this.buildHintText(this.state.name);
    if (h === "") {
      this.props.addMachine(this.props.type, this.state.name);
      this.props.onClose();
    } else {
      this.setState(
        (prevState, props) => {
          return { name: prevState.name,
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
          <DialogTitle id="form-dialog-title">Duplicating "{this.props.name}"</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the name of the new machine.
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

class MachineCard extends React.Component {
  state = {
    anchorEl: null,
    duplicateOpen: false,
  };

  handleOptionsClick = event => {
    this.setState({ anchorEl: event.currentTarget, duplicateOpen: false });
  };

  handleOptionsClose = () => {
    this.setState({ anchorEl: null, duplicateOpen: false });
  };

  openDuplicate = () => {
    this.setState( (prevState, props) => {
      return {
        duplicateOpen: true,
        anchorEl: prevState.anchorEl
      };
    });
  }

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.handleOptionsClose}
      >
        <MenuItem onClick={this.openDuplicate} onClose={this.onClose}>
          Duplicate
        </MenuItem>
      </Menu>
      <DuplicateDialog isOpen={this.state.duplicateOpen} onClose={this.handleOptionsClose}
                       name={this.props.title} type={this.props.type}
                       addMachine={this.props.addMachine} machines={this.props.machines} />
      <Card style={styles.card}>
        <CardActions
          style={{ ...styles.banner, backgroundColor: MachineColors[this.props.type] }}
        >
          <Typography variant="body2">
            {this.props.title.toUpperCase()}
          </Typography>
          <IconButton
          style={styles.option}
          onClick={this.handleOptionsClick}
          >
            <MoreHorizIcon />
          </IconButton>
        </CardActions>
        <CardActionArea onClick={() => this.props.todfa(this.props.title)}>
          <CardContent >
            <Typography style={styles.preview_pane} color="textSecondary">
              Click me to get to the machine.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </div>
    );
  }
}

class CardGrid extends React.Component {
  render() {
    return (
      <Grid container spacing={16} style={{margin:16}}>
        {this.props.machines.map(x => (
          <Grid item key={x.title}>
            <MachineCard title={x.title} type={x.type} todfa={this.props.todfa}
             addMachine={this.props.addMachine} machines={this.props.machines}/>
          </Grid>
        ))}
      </Grid>
    );
  }
}

class NewMachineDialog extends React.Component {
  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
    let smallText = (string) => <p style={{fontSize:"85%"}}>{string}</p>;

    return (
      <Dialog onClose={this.props.onClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Select a Machine Type</DialogTitle>
        <div>
          <List>
            <ListItem button onClick={() => { this.props.addMachine("dfa"); this.props.onClose(); }}>
              <ListItemAvatar>
                <Avatar style={{backgroundColor: MachineColors["dfa"]}} children={smallText("DFA")} />
              </ListItemAvatar>
              <ListItemText primary="New DFA"/>
            </ListItem>
            <ListItem button onClick={() => { this.props.addMachine("nfa"); this.props.onClose(); }}>
              <ListItemAvatar>
              <Avatar style={{backgroundColor: MachineColors["nfa"]}} children={smallText("NFA")}   />
              </ListItemAvatar>
              <ListItemText primary="New NFA"/>
            </ListItem>
            <ListItem button onClick={() => { this.props.addMachine("tm"); this.props.onClose(); }}>
              <ListItemAvatar>
              <Avatar style={{backgroundColor: MachineColors["tm"]}} children={smallText("TM")} />
              </ListItemAvatar>
              <ListItemText primary="New Turing Machine"/>
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}

class AddMachineButton extends React.Component {
  state = { open: false };

  handleOpen = () => {
    this.setState({ open: true, });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleOpen} variant="fab" color="primary"
                style={{ right: 20, bottom: 20, position: 'fixed'}}>
          <AddIcon />
        </Button>
        <NewMachineDialog open={this.state.open} onClose={this.handleClose} addMachine={this.props.addMachine} />
      </div>
    );
  }
}

class MachineSelectPage extends React.Component {
  state = {
    machines: [
      { title: "Sample DFA", type: "dfa" },
      { title: "Sample NFA", type: "nfa" },
      { title: "Sample TM", type: "tm" },
      { title: "Another DFA", type: "dfa" }
    ]
  }

  addMachine = (type, name) => {
    this.setState((prevState, props) => {
      if (typeof name === "undefined")
        name = `New ${type}`;
      return {
        machines: prevState.machines.concat([
            { title: name, type: type }
        ])
      };
    });
  };

  render() {
    return (
        <div>
          <ADAMToolbar title="Select a Machine" />
          <CardGrid todfa={this.props.todfa} addMachine={this.addMachine} machines={this.state.machines}/>
          <AddMachineButton addMachine={this.addMachine}/>
        </div>
    );
  }
}

export default MachineSelectPage;
