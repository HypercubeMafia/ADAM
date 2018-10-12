import React from "react";
import { Layer, Circle, Arrow, Text, Group } from 'react-konva';

class State extends React.Component {
  radius = 40;
  accept_pad = 5;

  dragBound = pos => { //function which ensures state is not dragged off of canvas
    const px = pos.x + this.props.state.x; //add relative position for bounds checks
    const py = pos.y + this.props.state.y; //add relative position for bounds checks

    const w = this.props.size.width;
    const h = this.props.size.height;

    const r = this.radius+5;

    const x = px < r ? r : px > w-r ? w-r : px ;
    const y = py < r ? r : py > h-r ? h-r : py ;

    return {x:x-this.props.state.x, y:y-this.props.state.y}; //subtract relative position after checks
  }

  render() {
    //if we are the start state, this holds the start label
    var startLabel = this.props.start ?
      (<Text
        x={this.props.state.x-this.radius-80}
        y={this.props.state.y-8}
        fontSize={16}
        text={"start"}
      />)
    : null;

    //if we are the start state, this holds the start arrow
    var startArrow = this.props.start ?
      (<Arrow
        points={[this.props.state.x-this.radius-40, this.props.state.y,
                 this.props.state.x-this.radius, this.props.state.y]}
        fill={"black"}
        stroke={"black"}
        strokeWidth={1}
      />)
    : null;

    var stateCircle = (<Circle
      x={this.props.state.x}
      y={this.props.state.y}
      radius={this.radius}
      stroke={this.props.clicked ? "green" : "black"} //green on select
      strokeWidth={this.props.clicked ? 3 : 1} //thicker on select
    />);

    //if we are the start state, this holds the start arrow
    var acceptingCircle = this.props.state.accepting ?
      (<Circle
          x={this.props.state.x}
          y={this.props.state.y}
          radius={this.radius-this.accept_pad}
          stroke={this.props.clicked ? "green" : "black"} //green on select
          strokeWidth={this.props.clicked ? 3 : 1} //thicker on select
      />)
    : null;

    return (
      <Layer>
        <Group
          draggable
          dragBoundFunc = {this.dragBound}
          onDragEnd = {this.props.onDragEnd}
          onClick = {this.props.onClick}
        >
          {stateCircle /*that has to be first child of the group*/} 
          {acceptingCircle}
          {startLabel}
          {startArrow}
        </Group>
      </Layer>
    )
  }
}

export default State;
