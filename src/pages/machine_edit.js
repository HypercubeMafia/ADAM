import React from "react";
import update from 'immutability-helper';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ADAMToolbar from '../components/toolbar';
import MachineCanvas from '../components/machine_canvas';
import NameStateDialog from '../components/name_state_dialog';

const PageStatus = {
  default : 1,
  addState : 2,
  stateSelected : 3,
}

class EditPage extends React.Component {
  state = {
    status : PageStatus.default, //current action being performed
    machine : { // machine description
      states : [],
      startState : -1 //-1 for no state
    },
    clickedState : -1, //state which is currently clicked, -1 for no state
    nameStateOpen: false
  };

  getModeText = () => {
    switch(this.state.status){
      case PageStatus.addState:
        return "Click on the canvas to draw a state.";
      default:
        return '\u200b';
    }
  }

  buttons = () => [
    {
      body: "Add State",
      onClick: () => this.setState({ status: PageStatus.addState })
    }
  ];

  handleCanvasClick = e => {
    if (this.state.status === PageStatus.addState) {
      this.setState({
        machine:
          update(this.state.machine, {states: {
            $push: [{x:e.evt.offsetX, y:e.evt.offsetY, accepting:false, name:""}]
            // add a state centered at the click location to states array
          }}),
        status: PageStatus.default //return to default page status
      });
    }
  }

  handleStateClick = i => {
    if (this.state.clickedState === i) { //this state is currently selected, so we unselect it
      this.setState({
        status: PageStatus.default, //return to default page status
        clickedState: -1 //no state is currently clicked
      });
    } else { //this state is currently unselected
      this.setState({
        status: PageStatus.stateSelected, //now in state selected page status
        clickedState: i //indicate that this state has been clicked
      });
    }
  }

  handleStateDrag = (e,i) => {
    this.setState({
      machine: update(this.state.machine, {states: {[i]: {
      $merge: {x: e.target.children[0].x(), y: e.target.children[0].y()}
        //set the location of the state to be the end location of the drag
      }}})
    });
  }

  nameStateOpen = () => {
    this.setState({nameStateOpen: true});
  }

  handleNameStateClose = () => {
    this.setState({nameStateOpen: false});
  }

  handleNameStateSubmit = (name) => {
    this.setState({
      machine: update(this.state.machine, {states: {[this.state.clickedState]: {
        $merge: {name:name}
      }}}),
      nameStateOpen: false});
  }

  // returns {canSubmit: bool, helperText: string}
  validateNewStateName = (name) => {
    if (name === "") return {canSubmit: true, helperText: ""};

    let maxLength = 20;
    if (name.length > maxLength) {
        return {canSubmit: false, helperText: `Name must be less than ${maxLength} characters.`}
      }

    for (var i=0; i < this.state.machine.states.length; ++i) {
      if (i !== this.state.clickedState && this.state.machine.states[i].name === name) {
        return {canSubmit: true, helperText: "Warning: Name already in use."};
      }
    }

    return {canSubmit: true, helperText: ""};
  }

  getStateToolbar = () => {
    return (<ADAMToolbar title="MODIFY STATE"
      back={() => this.setState({ status: PageStatus.default, clickedState: -1 }) }
      btns={[
        {
          body: "Make Start State",
          onClick: () => this.setState({
            machine: update(this.state.machine, {startState: {
              $set: this.state.clickedState
            }})
          })
        },
        {
          body: (this.state.machine.states[this.state.clickedState].accepting)
            ? "Make Non-Accepting State"
            : "Make Accepting State",
          onClick: () => this.setState({
            machine: update(this.state.machine, {states: {[this.state.clickedState]: {accepting: {
              $set: !(this.state.machine.states[this.state.clickedState].accepting)
            }}}})
          })
        },
        {
          body: "Change Name",
          onClick: () => this.nameStateOpen()
        }
      ]}
    />);
  }

  getMainToolbar = () => {
    return (<ADAMToolbar
      title="EDIT"
      back={this.props.back}
      btns={[
        {
          body: "Add State",
          onClick: () => this.setState({ status: PageStatus.addState })
        },
      ]}
    />);
  }

  render() {
    var toolbar = ((s) => {
      if (s === PageStatus.stateSelected) {
        return this.getStateToolbar();
      } else {
        return this.getMainToolbar();
      }
  })(this.state.status);

    return (
      <div>
        {toolbar}

        <Paper elevation={1} style={{margin:32, padding:0}}>
          <Typography variant="headline" component="h3">
            {this.getModeText()}
          </Typography>
        </Paper>

        <Paper elevation={1} style={{margin:32, padding:0}}>
          <MachineCanvas
            machine={this.state.machine}
            clickedState={this.state.clickedState}
            onClick={this.handleCanvasClick} //handle canvas click (for add state)
            onStateClick={this.handleStateClick} //handles state click (for highlighting)
            onStateDrag={this.handleStateDrag} //handles state drag (to move state)
          />
        </Paper>

      <NameStateDialog
        isOpen={this.state.nameStateOpen}
        onClose={this.handleNameStateClose}
        onSubmit={this.handleNameStateSubmit}
        validate={this.validateNewStateName}
      />

      </div>
    );
  }
}

export default EditPage;
