import React from "react";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ADAMToolbar from '../components/toolbar.js';

const styles = {
  card: {
    width: 200
  },
  preview_pane: {
    marginBottom: 100,
    fontSize: 14
  },
  banner: {
    //paddingTop: 0,
    //paddingBottom: 0
  },
  option: {
    marginLeft: "auto"
  }
};

var machines = [
  { title: "Sample DFA", type: "dfa" },
  { title: "Sample NFA", type: "nfa" },
  { title: "Sample TM", type: "tm" },
  { title: "Another DFA", type: "dfa" }
];

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
        {machines.map(x => (
          <Grid item>
            <MachineCard title={x.title} type={x.type} todfa={this.props.todfa}/>
          </Grid>
        ))}
      </Grid>
    );
  }
}

class AddMachineButton extends React.Component {
  state = { open: false };

  // handleOpen = () => {
  //   this.setState({ open: true, });
  // };
  //
  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  render() {
    return (
      <div>
        <Button onClick={this.handleOpen} variant="fab" color="primary"
                style={{ right: 20, bottom: 20, position: 'fixed'}}>
          <AddIcon />
        </Button>
        {/*<NewMachineDialog open={this.state.open} onClose={this.handleClose}/>*/}
      </div>
    );
  }
}

class MachineSelectPage extends React.Component {
  render() {
    return (
        <div>
          <ADAMToolbar title="Select a Machine" />
          <CardGrid todfa={this.props.todfa}/>
          <AddMachineButton/>
        </div>
    );
  }
}

export default MachineSelectPage;
