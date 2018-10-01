import React from "react";
import ReactDOM from 'react-dom';

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
    // Pre-bind your event handler, or define it as a fat arrow in ES7/TS
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    console.log("("+event.pageX+","+event.pageY+")");
    this.props.addState(event.pageX,event.pageY);
  };

  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener('click', this.handleClick);
  }

  componentDidUpdate() {
    var state;
    console.log("IN UPDATE");
    console.log(this.props.machine.states);
    for(state in this.props.machine.states){
      console.log("<<"+state+">>");
      var c = ReactDOM.findDOMNode(this);
      var ctx = c.getContext("2d");
      ctx.beginPath();
      ctx.arc(state.x, state.y, 10, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }

  render() {
    return (
      <canvas id="myCanvas" style={styles.canvas} />
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

  setPageStatus = (my_status) => {
    this.setState((prevState, props) => {
      return {
        status: my_status,
        machine: prevState.machine
      };
    })
  };

  addState = (my_x,my_y) => {
      this.setState((prevState, props) => {
        var s = prevState.machine.states;
        s.push({ x: my_x, y: my_y });
        return {
          status: PageStatus.default,
          machine: { states: s }
        };
      })
      console.log(this.state.machine.states);
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
