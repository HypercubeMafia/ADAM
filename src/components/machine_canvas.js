import React from "react";
import ReactDOM from 'react-dom';
import { Stage, Layer, Rect } from 'react-konva';

import State from './machine/state';
import Comment from './machine/comment';
import Transition from './machine/transition';

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
    let withKey = (state, key) => state.okey === key;
    let sts = this.props.machine.states;

    return (
      <Stage width={this.state.width} height={this.state.height} onClick={this.props.onClick}>
      <Layer>
      <Rect
        width={this.state.width}
        height={this.state.height}
        fill={"white"}
      />
          {this.props.machine.transitions.map( (s,i) => (
            <Transition
              key={s.key}
              size={this.state} //size of canvas, used to bound control point's drag area
              src={{ state: sts.find((e) => withKey(e,s.srcState)), loc: s.srcLoc}}
              dest={{ state: sts.find((e) => withKey(e,s.destState)), loc: s.destLoc}}
              clicked={i === this.props.clickedTransition} //whether this is clicked state
              onClick={() => this.props.onTransitionClick(i)} //function to call on comment click
            />
          ))}
          {this.props.machine.states.map( (s,i) => {
            let attachmentPoints = "";
            if (this.props.addingTransition) {
              if (i === this.props.transitionSrc.state) {
                  attachmentPoints = this.props.transitionSrc.loc;
              } else {
                  attachmentPoints = "A";
              }
            }
            return (
            <State
              key={s.key}
              state={s} //object holding state attributes
              size={this.state} //size of canvas, used to bound state's drag area
              clicked={i === this.props.clickedState} //whether this is clicked state
              start={s.okey === this.props.machine.startState} //whether this is start state
              onClick={() => this.props.onStateClick(i)} //function to call on state click
              onDragEnd={(e) => this.props.onStateDrag(e,i)} //function to call on state drag end
              onAttachPointClick={(loc)=>this.props.onAttachPointClick(s.okey,loc)}
              attachmentPoints={attachmentPoints}
            />
          )})}
	        {this.props.machine.comments.map( (s,i) => (
            <Comment
              comment={s} //object holding state attributes (currently just location)
              size={this.state} //size of canvas, used to bound state's drag area
              clicked={i === this.props.clickedComment} //whether this is clicked state
              onClick={() => this.props.onCommentClick(i)} //function to call on comment click
              onDragEnd={(e) => this.props.onCommentDrag(e,i)} //function to call on state drag end
             />
          ))}
      </Layer>
      </Stage>
    )
  }
}

export default MachineCanvas;
