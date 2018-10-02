import React from "react";
import { Stage, Layer, Circle } from 'react-konva';

import Paper from '@material-ui/core/Paper';

import ADAMToolbar from '../components/toolbar';

const PageStatus = {
  default : 1,
  addState : 2
}

class MachineCanvas extends React.Component {

  handleClick = event => {
    if (this.props.status === PageStatus.addState) {
      this.props.addState(event.evt.offsetX,event.evt.offsetY);
    }
  };

  render() {
    const states = this.props.machine.states;

    return (
      <Stage ref="stage" width={window.innerWidth} height={600} onClick={this.handleClick}>
        <Layer>
          {states ? states.map(state => (
            <Circle x={state.x} y={state.y} radius={40} stroke="black" />
          )) : null}
        </Layer>
      </Stage>
    )
  }
}


class EditPage extends React.Component {
  state = {
    status : PageStatus.default, //current action being performed
    machine : { // machine description
      states : []
    }
  };

  buttons = () => [
    {
      body: "Add State",
      onClick: () => this.setPageStatus(PageStatus.addState)
    }
  ];

  setPageStatus = (status) => {
    this.setState((prevState, props) => {
      return {
        status: status,
        machine: prevState.machine
      };
    })
  };

  addState = (x,y) => {
      this.setState((prevState, props) => {
        var s = prevState.machine.states;
        s.push({ x:x, y:y });
        return {
          status: PageStatus.default,
          machine: { states: s }
        };
      })
  };

  render() {
    return (
      <div>
        <ADAMToolbar title="EDIT" back={this.props.back} btns={this.buttons()} />
        <Paper elevation={1} style={{margin:32, padding:0}}>
          <MachineCanvas machine={this.state.machine} status={this.state.status} addState={this.addState}/>
        </Paper>
      </div>
    );
  }
}


export default EditPage;
