import React from "react";
import update from 'immutability-helper';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ADAMToolbar from '../components/toolbar';
import MachineCanvas from '../components/machine_canvas';


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
            $push: [{x:e.evt.offsetX, y:e.evt.offsetY, accepting:false}]
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
          onClick: () => console.log("Change Name clicked")
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
      </div>
    );
  }
}

export default EditPage;
