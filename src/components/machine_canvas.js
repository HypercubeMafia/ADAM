import React from "react";
import ReactDOM from 'react-dom';
import { Stage } from 'react-konva';

import State from './machine/state';
import Comment from './machine/comment';
class MachineCanvas extends React.Component {
  state = { //default values used until component loads
    width: 1000,
    height: 600,
  }

  updateDimensions() { //resize the canvas to fill window (with margins)
    const w = ReactDOM.findDOMNode(this).parentNode.offsetWidth;
    const h = ReactDOM.findDOMNode(this).parentNode.offsetHeight;
    this.setState({width: w, height: h});
  }

  componentDidMount() {
    this.updateDimensions(); //initial resize
    window.addEventListener("resize", () => this.updateDimensions()); //listener calls updateDimension on future resizes
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateDimensions()); //remove action listener (because that's what the internet said)
  }

  render() {
    return (
      <Stage width={this.state.width} height={this.state.height} onClick={this.props.onClick}>
          {this.props.machine.states.map( (s,i) => (
            <State
              state={s} //object holding state attributes (currently just location)
              size={this.state} //size of canvas, used to bound state's drag area
              clicked={i === this.props.clickedState} //whether this is clicked state
              start={i === this.props.machine.startState} //whether this is start state
              onClick={() => this.props.onStateClick(i)} //function to call on state click
              onDragEnd={(e) => this.props.onStateDrag(e,i)} //function to call on state drag end
              addingTransition={this.props.addingTransition}
            />
          ))}
	        {this.props.machine.comments.map( (s,i) => (
            <Comment
              comment={s} //object holding state attributes (currently just location)
              size={this.state} //size of canvas, used to bound state's drag area
              clicked={i === this.props.clickedComment} //whether this is clicked state
              onClick={() => this.props.onCommentClick(i)} //function to call on comment click
              onDragEnd={(e) => this.props.onCommentDrag(e,i)} //function to call on state drag end
             />
          ))}
      </Stage>
    )
  }
}

export default MachineCanvas;
