import React from "react";
import ReactDOM from 'react-dom';
import { Stage, Layer } from 'react-konva';

import State from './machine/state';

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

  render() {
    return (
      <Stage width={this.state.width} height={this.state.height} onClick={this.props.onClick}>
        <Layer>
          {this.props.machine.states.map( (s,i) => (
            <State
              state={s} size={this.state}
              clicked={i === this.props.clickedState}
              onClick={() => this.props.onStateClick(i)}
              onDragEnd={(e) => this.props.onStateDrag(e,i)}
            />
          ))}
        </Layer>
      </Stage>
    )
  }
}

export default MachineCanvas;
