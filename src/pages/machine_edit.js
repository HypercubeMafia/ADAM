import React from "react";
import ReactDOM from 'react-dom';
import { Stage, Layer, Circle } from 'react-konva';

import Paper from '@material-ui/core/Paper';

import ADAMToolbar from '../components/toolbar';
import State from '../machine/state';

const PageStatus = {
  default : 1,
  addState : 2
}


class State extends React.Component {
  state = { s: this.props.state }

  handleDragEnd = e => {
    this.setState( (prevState, props) => {
      return(
        {
          s: {
            x: e.target.x(),
            y: e.target.y(),
            clicked: prevState.s.clicked
          }
        }
      )
    });
  };

  handleClick = () => {
    this.setState( (prevState, props) => {
      return(
        {
          s: {
            x: prevState.s.x,
            y: prevState.s.y,
            clicked: !(prevState.s.clicked)
          }
        }
      )
    });
  };

  dragBound = pos => {
    const w = this.props.size.width;
    const h = this.props.size.height;

    const r = 45;

    const x = pos.x < r ? r : pos.x > w-r ? w-r : pos.x ;
    const y = pos.y < r ? r : pos.y > h-r ? h-r : pos.y ;
    return {x:x, y:y};
  }

  render() {
    return (
      <Circle
        x = {this.state.s.x}
        y = {this.state.s.y}
        radius = {40}
        stroke = {this.state.s.clicked ? "green" : "black"}
        strokeWidth = {this.state.s.clicked ? 2 : 1}
        draggable
        dragBoundFunc = {this.dragBound}
        onDragEnd = {this.handleDragEnd}
        onClick = {this.handleClick}
      />
    )
  }
}

class MachineCanvas extends React.Component {

  state = {
    width: 1000,
    height: 600
  }

  updateDimensions() {
    const w = ReactDOM.findDOMNode(this).parentNode.offsetWidth;
    const h = ReactDOM.findDOMNode(this).parentNode.offsetHeight;

    this.setState({width: w, height: h});
  }

   componentDidMount() {
     this.updateDimensions();
     window.addEventListener("resize", () => this.updateDimensions());
   }

   componentWillUnmount() {
     window.removeEventListener("resize", () => this.updateDimensions());
   }


  handleClick = event => {
    if (this.props.status === PageStatus.addState) {
      this.props.addState(event.evt.offsetX,event.evt.offsetY);
    }
  };

  render() {
    const states = this.props.machine.states;

    return (
      <Stage ref="stg" width={this.state.width} height={this.state.height} onClick={this.handleClick}>
        <Layer>
          {states ? states.map( s => (<State state={s} size={this.state} />) ) : null}
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

  setPageStatus = status => this.setState({ status: status });

  addState = (x,y) => {
      this.setState((prevState, props) => {
        var s = prevState.machine.states;
        s.push({ x:x, y:y, clicked:false });
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
