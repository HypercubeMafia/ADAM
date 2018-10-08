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
    height: 600,
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
    if (state.state.s.clicked) {
      //this state is currently selected, unselect and return to default page status
      state.setState( (prevState, props) => ({
        s: { ...prevState.s, clicked: false }
      }));
      this.props.setPageStatus(PageStatus.default);
    } else {
      //this state is currently unselected, so we should select it
      if (this.props.pageState.status === PageStatus.stateSelected) {
        //another state is selected, we first return the page to the default state
        this.props.toDefault();
      }
      state.setState( (prevState, props) => ({
        s: { ...prevState.s, clicked: true }
      }));
      this.props.setPageStatus(PageStatus.stateSelected);
    }
  };

  dragState = (e,state) => {
    state.setState( (prevState, props) => ({
      s: { ...prevState.s, x: e.target.x(), y: e.target.y() }
    }));
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
          {states ? states.map( s => (
            <State state={s} size={this.state} onClick={this.clickState} onDragEnd={this.dragState} />
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

  toDefault = () => {
    this.setState((prevState, props) => ({
      status: PageStatus.default,
      machine : {
        states: prevState.machine.states.map( s => ({ ...s, clicked:false }) )
      }
    }));
  };

  render() {
    var main_toolbar = (<ADAMToolbar title="EDIT" back={this.props.back} btns={this.buttons()} />);
    var state_toolbar = (<ADAMToolbar title="MODIFY STATE" back={this.toDefault} />);

    var toolbar = this.state.status === PageStatus.stateSelected ? state_toolbar : main_toolbar;

    return (
      <div>
        {toolbar}
        <Paper elevation={1} style={{margin:32, padding:0}}>
          <MachineCanvas
            pageState={this.state}
            addState={this.addState}
            setPageStatus={this.setPageStatus}
            toDefault={this.toDefault}
          />
        </Paper>
      </div>
    );
  }
}

export default EditPage;
