import React from "react";
import { Layer, Arrow, Group, Line, Circle } from 'react-konva';

class Transition extends React.Component {
  radius = 40; // MUST match radius in state.js!!!!!
  control_radius = 5;

  xOffset = c => {
    if (c === "E") return this.radius;
    else if (c === "W") return -this.radius;
    else return 0;
  };

  yOffset = c => {
    if (c === "S") return this.radius;
    else if (c === "N") return -this.radius;
    else return 0;
  };

  link = (src, dest) => {
    let x1 = src.state.x + this.xOffset(src.loc);
    let y1 = src.state.y + this.yOffset(src.loc);
    let x2 = dest.state.x + this.xOffset(dest.loc);
    let y2 = dest.state.y + this.yOffset(dest.loc);
    let xc = this.state.controlX(x1,y1,x2,y2); //Math.floor((x1+x2)/2 + (y2-y1) * 0.2);
    let yc = this.state.controlY(x1,y1,x2,y2); //Math.floor((y1+y2)/2 + (x1-x2) * 0.2);
    return [x1,y1,xc,yc,xc,yc,x2,y2];
  }

  loop = (src) => {
    let tri_len = 3.0; // Relative to radius
    let x = src.state.x + this.xOffset(src.loc);
    let y = src.state.y + this.yOffset(src.loc);
    let xc1 = src.state.x + tri_len * (this.xOffset(src.loc) - 0.6 * this.yOffset(src.loc));
    let yc1 = src.state.y + tri_len * (this.yOffset(src.loc) - 0.6 * this.xOffset(src.loc));
    let xc2 = src.state.x + tri_len * (this.xOffset(src.loc) + 0.6 * this.yOffset(src.loc));
    let yc2 = src.state.y + tri_len * (this.yOffset(src.loc) + 0.6 * this.xOffset(src.loc));
    return [x,y,xc1,yc1,xc2,yc2,x,y];
  }

  dragBound = pos => { //function which ensures the control point is not dragged off of canvas
    const w = this.props.size.width;
    const h = this.props.size.height;
    const r = this.control_radius+5;

    const x = pos.x < r ? r : pos.x > w-r ? w-r : pos.x ;
    const y = pos.y < r ? r : pos.y > h-r ? h-r : pos.y ;
    return { x : x, y : y };
  }

  constructor(props) {
    super(props);

    if (props.src.state === props.dest.state) {
      this.state = { isLoop : true }
    } else {
      this.state = {
        isLoop : false,
        controlX : (x1,y1,x2,y2) => Math.floor((x1+x2)/2 + (y2-y1) * 0.2),
        controlY : (x1,y1,x2,y2) => Math.floor((y1+y2)/2 + (x1-x2) * 0.2)
      }
    }
  };

  render() {
    let points = this.state.isLoop ? this.loop(this.props.src) : this.link(this.props.src, this.props.dest);

    let control = (this.props.clicked && !this.state.isLoop) ?
      (<Circle
        x={points[2]}
        y={points[3]}
        radius={this.control_radius}
        fill={"red"}
        draggable
        dragBoundFunc = {this.dragBound}
        onDragEnd = { (e) => {
          this.setState({
            controlX : (x1,y1,x2,y2) => e.target.attrs.x,
            controlY : (x1,y1,x2,y2) => e.target.attrs.y
          });
        }}
      />)
    : null;


    return (
        <Group>
          <Line
            points = {points}
            stroke={"white"}
            strokeWidth={20}
            bezier={true}
            onClick={this.props.onClick}
          />
          <Arrow
            points = {points}
            fill={this.props.clicked ? "green" : "black"}
            stroke={this.props.clicked ? "green" : "black"}
            strokeWidth={this.props.clicked ? 3 : 1}
            bezier={true}
          />
          {control}
        </Group>
    );
  }
}

export default Transition;
