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
      states : []
    },
    clickedState : -1, //state which is currently clicked, -1 for no state
    startState : -1 //-1 for no state
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
            $push: [{x:e.evt.offsetX, y:e.evt.offsetY}]
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
        $merge: {x: e.target.x(), y: e.target.y()}
      }}})
    });
  }

  render() {
    var main_toolbar = ( <ADAMToolbar title="EDIT" back={this.props.back}
      btns={[
        {
          body: "Add State",
          onClick: () => this.setState({ status: PageStatus.addState })
        },
      ]} />);

    var state_toolbar = ( <ADAMToolbar title="MODIFY STATE"
      back={() => this.setState({ status: PageStatus.default, clickedState: -1 }) }
      btns={[
        {
          body: "Make Start State",
          onClick: () => this.setState({ startState: this.state.clickedState })
        }
      ]} />);

    var toolbar = this.state.status === PageStatus.stateSelected ? state_toolbar : main_toolbar;

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
            startState={this.state.startState}
            onClick={this.handleCanvasClick}
            onStateClick={this.handleStateClick}
            onStateDrag={this.handleStateDrag}
          />
        </Paper>
      </div>
    );
  }
}

export default EditPage;
