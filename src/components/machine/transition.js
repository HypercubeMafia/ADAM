import React from "react";
import { Layer, Arrow, Group,Line } from 'react-konva';

class Transition extends React.Component {

    render() {
        let radius = 40; // MUST match radius in state.js!!!!!
        let xOffset = c => {
            switch(c) {
                case "N":
                case "S":
                return 0;
                case "E":
                return radius;
                case "W":
                return -radius;
                default:
                console.log(`xOffset: Expected N, E, W, or S, but got ${c}`)
            }
        };

        let yOffset = c => {
            switch(c) {
                case "E":
                case "W":
                return 0;
                case "N":
                return -radius;
                case "S":
                return radius;
                default:
                console.log(`yOffset: Expected N, E, W, or S, but got ${c}`)
            }
        };

        let src = this.props.src;
        let dest = this.props.dest;

        let x1 = src.state.x + xOffset(src.loc)
        let y1 = src.state.y + yOffset(src.loc)
        let x2 = dest.state.x + xOffset(dest.loc)
        let y2 = dest.state.y + yOffset(dest.loc)

        let points = [];

        if (src.state === dest.state) {
          let tri_len = 3.0; // Relative to radius

          let xc1 = src.state.x + tri_len * (xOffset(src.loc) - 0.6 * yOffset(src.loc));
          let yc1 = src.state.y + tri_len * (yOffset(src.loc) - 0.6 * xOffset(src.loc));
          let xc2 = src.state.x + tri_len * (xOffset(src.loc) + 0.6 * yOffset(src.loc));
          let yc2 = src.state.y + tri_len * (yOffset(src.loc) + 0.6 * xOffset(src.loc));
          points = [x1,y1, xc1,yc1, xc2,yc2, x2,y2];
        } else {
          let xc = Math.floor((x1+x2)/2 + (y2-y1) * 0.2);
          let yc = Math.floor((y1+y2)/2 + (x1-x2) * 0.2);
          points = [x1,y1,xc,yc,xc,yc,x2,y2];
        }

        return (
            <Layer>
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
            </Group>
            </Layer>
        );
    }
}

export default Transition;
