import React from "react";
import { Layer, Circle, Arrow, Text } from 'react-konva';

class State extends React.Component {
  radius = 40;

  dragBound = pos => {
    const w = this.props.size.width;
    const h = this.props.size.height;

    const r = this.radius+5;

    const x = pos.x < r ? r : pos.x > w-r ? w-r : pos.x ;
    const y = pos.y < r ? r : pos.y > h-r ? h-r : pos.y ;
    return {x:x, y:y};
  }

  render() {
    var startLabel = this.props.start ?
      (<Text
        x={this.props.state.x-this.radius-80}
        y={this.props.state.y-8}
        fontSize={16}
        text={"start"}
      />)
    : null;

    var startArrow = this.props.start ?
      (<Arrow
        points={[this.props.state.x-this.radius-40, this.props.state.y,
                 this.props.state.x-this.radius, this.props.state.y]}
        fill={"black"}
        stroke={"black"}
        strokeWidth={1}
      />)
    : null;

    return (
      <Layer>
        {startLabel}
        {startArrow}
        <Circle
          x = {this.props.state.x}
          y = {this.props.state.y}
          radius = {this.radius}
          stroke = {this.props.clicked ? "green" : "black"}
          strokeWidth = {this.props.clicked ? 3 : 1}
          draggable
          dragBoundFunc = {this.dragBound}
          onDragEnd = {this.props.onDragEnd}
          onClick = {this.props.onClick}
        />
      </Layer>
    )
  }
}

export default State;
