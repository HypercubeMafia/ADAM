import React from "react";

import Paper from '@material-ui/core/Paper';

import ADAMToolbar from '../components/toolbar';

const styles = {
  canvas : {
    width : "100%",
    height : 800
  }
}

const PageStatus = {
  default : 1,
  addState : 2
}

class MachineCanvas extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    if (this.props.status === PageStatus.addState) {
      console.log("("+event.pageX+","+event.pageY+")");
      this.props.addState(event.pageX,event.pageY);
    }
  };

  componentDidMount() {
    this.refs.canvas.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    this.refs.canvas.removeEventListener('click', this.handleClick);
  }

  componentDidUpdate() {
    const machine = this.props.machine;
    for(var i=0; i < machine.states.length; ++i){
      const state = machine.states[i];
      const ctx = this.refs.canvas.getContext("2d");
      ctx.beginPath();
      ctx.arc(state.x, state.y, 10, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }

  render() {
    return (
      <canvas ref="canvas" style={styles.canvas} />
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
        <Paper elevation={1} style={{margin:32, padding:16}}>
          <MachineCanvas machine={this.state.machine} status={this.state.status} addState={this.addState}/>
        </Paper>
      </div>
    );
  }
}


export default EditPage;
