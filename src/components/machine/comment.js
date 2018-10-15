import React from "react";
import { Layer, Text } from 'react-konva';
import ReactDOM from 'react-dom';

class Comment extends React.Component {
  state={ dragBound : pos => {return{x:pos.x,y:pos.y}}}
  width = 250;
  componentDidMount() {
    
    this.setState({dragBound : pos => {
    const height = ReactDOM.findDOMNode(this).children[0].getHeight();
    const w = this.props.size.width;
    const h = this.props.size.height;
    const x = pos.x < 5 ? 5 : pos.x > w-this.width+5 ? w-this.width+5 : pos.x ;
    const y = pos.y < 5 ? 5 : pos.y > h-height-5 ? h-height-5 : pos.y ;
    return{x:x,y:y};
    }});
  }

  

  render() {
    
    return (
      <Layer>
        
	<Text
	 x = {this.props.comment.x}
         y = {this.props.comment.y}
	 text = {this.props.comment.com}
	 fontSize = {18}
	 padding = {20}
	 align = {'center'}
	 draggable
	 width={this.width}
         dragBoundFunc = {this.state.dragBound}
         onDragEnd = {this.props.onDragEnd}

	/>	
      </Layer>
    )
  }
}

export default Comment;
