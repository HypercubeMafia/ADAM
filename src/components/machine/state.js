import React from "react";
import { Circle } from 'react-konva';

class State extends React.Component {

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
        x = {this.props.state.x}
        y = {this.props.state.y}
        radius = {40}
        stroke = {this.props.clicked ? "green" : "black"}
        strokeWidth = {this.props.clicked ? 3 : 1}
        draggable
        dragBoundFunc = {this.dragBound}
        onDragEnd = {this.props.onDragEnd}
        onClick = {this.props.onClick}
      />
    )
  }
}

export default State;
