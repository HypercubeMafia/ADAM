import React from "react";
import { Layer, Arrow } from 'react-konva';

class Transition extends React.Component {

    // componentWillReceiveProps() {
    //   this.forceUpdate();
    // }

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

        console.log(src);
        console.log(dest);

        let x1 = src.state.x + xOffset(src.loc)
        let y1 = src.state.y + yOffset(src.loc)
        let x2 = dest.state.x + xOffset(dest.loc)
        let y2 = dest.state.y + yOffset(dest.loc)

        console.log([x1, y1, x2, y2])

        return (
            <Layer>
            <Arrow
            points = {[
                x1,
                y1,
                x2,
                y2
            ]}
            fill={"black"}
            stroke={"black"}
            strokeWidth={1}
            />
            </Layer>
        );
    }
}

export default Transition;

/*
var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
container: 'container',
width: width,
height: height
});

var layer = new Konva.Layer();

var arrow = new Konva.Arrow({
x: stage.getWidth() / 4,
y: stage.getHeight() / 4,
points: [0,0, width / 2, height / 2],
pointerLength: 20,
pointerWidth : 20,
fill: 'black',
stroke: 'black',
strokeWidth: 4
});

// add the shape to the layer
layer.add(arrow);

// add the layer to the stage
stage.add(layer);
*/
