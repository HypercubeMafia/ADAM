import React from "react";
import { Circle } from 'react-konva';

class State extends React.Component {
  state = { s: this.props.state }

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
        onDragEnd = {(e) => this.props.onDragEnd(e,this)}
        onClick = {() => this.props.onClick(this)}
      />
    )
  }
}

export default State;
