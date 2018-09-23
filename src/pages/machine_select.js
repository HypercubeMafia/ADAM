import React from 'react';

import ADAMToolbar from '../components/toolbar.js';
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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

class MachineCard extends React.Component {
  render() {
    return (
      <div>
      <Card style={styles.card}>
        <CardActions
          style={{ ...styles.banner, backgroundColor: MachineColors[this.props.type] }}
        >
          <Typography variant="body2">
            {this.props.title.toUpperCase()}
          </Typography>
          <IconButton
          style={styles.option}
          onClick={() => {window.location.href = "https://www.youtube.com/watch?v=rEq1Z0bjdwc"}}
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
          <Grid item>
            <MachineCard title={x.title} type={x.type} todfa={this.props.todfa}/>
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

  addMachine = (type) => {
    this.setState((prevState, props) => {
      return {
        machines: prevState.machines.concat([
            { title: `New ${type}`, type: type }
        ])
      };
    });
  };

  render() {
    return (
        <div>
          <ADAMToolbar title="Select a Machine" />
          <CardGrid todfa={this.props.todfa} machines={this.state.machines}/>
          <AddMachineButton addMachine={this.addMachine}/>
        </div>
    );
  }
}

export default MachineSelectPage;
