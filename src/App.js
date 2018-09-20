import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ADAMToolbar from './toolbar.js';

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

var colors = { dfa: "#7e57c2", nfa: "#ffa726", tm: "#42a5f5" };

class MachineCard extends React.Component {
  render() {
    return (
      <div>
      <Card style={styles.card}>
        <CardActions
          style={{ ...styles.banner, backgroundColor: colors[this.props.type] }}
        >
          <Typography variant="body2">
            {this.props.title.toUpperCase()}
          </Typography>
        </CardActions>
       {/*<Link to="/dfa_home/">*/} <CardActionArea>
          <CardContent >
            <Typography style={styles.preview_pane} color="textSecondary">
              Click me to get to the machine.
            </Typography>
          </CardContent>
        </CardActionArea>{/*</Link>*/}
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
            <MachineCard title={x.title} type={x.type} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

class MachineSelectPage extends React.Component {
  render() {
    return (
        <div>
          <ADAMToolbar title="Select a Machine"/>
          <CardGrid/>
          {/*<AddMachineButton/>*/}
        </div>
    );
  }
}

export default MachineSelectPage;
