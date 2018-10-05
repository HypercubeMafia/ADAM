import React from "react";
import ReactDOM from 'react-dom';
import { Stage, Layer } from 'react-konva';

import Paper from '@material-ui/core/Paper';

import ADAMToolbar from '../components/toolbar';
import State from '../machine/state';

const PageStatus = {
  default : 1,
  addState : 2,
  stateSelected : 3,
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

  clickState = (state) => {
    state.setState( (prevState, props) => {
      return ({
        s: {
          x: prevState.s.x,
          y: prevState.s.y,
          clicked: !(prevState.s.clicked)
        }
      })
    });
  }

  dragState = (e,state) => {
    state.setState( (prevState, props) => {
      return({
        s: {
          x: e.target.x(),
          y: e.target.y(),
          clicked: prevState.s.clicked
        }
      })
    });
  };

  handleClick = event => {
    if (this.props.pageState.status === PageStatus.addState) {
      this.props.addState(event.evt.offsetX,event.evt.offsetY);
    }
  };

  render() {
    const states = this.props.pageState.machine.states;

    return (
      <Stage ref="stg" width={this.state.width} height={this.state.height} onClick={this.handleClick}>
        <Layer>
          {states ? states.map( s => (<State state={s} size={this.state} onClick={this.clickState} onDragEnd={this.dragState} />) ) : null}
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
    },
    selectedState : null
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
          <MachineCanvas pageState={this.state} addState={this.addState}/>
        </Paper>
      </div>
    );
  }
}

export default EditPage;
