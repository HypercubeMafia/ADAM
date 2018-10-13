import React from "react";
import { Layer, Rect, Arrow, Text } from 'react-konva';

class Comment extends React.Component {
  width = 250;

  dragBound = pos => { //function which ensures state is not dragged off of canvas
    const height = this.props.height;
    const w = this.props.size.width;
    const h = this.props.size.height;

    const x = pos.x < 5 ? 5 : pos.x > w-this.width+5 ? w-this.width+5 : pos.x ;
    const y = pos.y < 5 ? 5 : pos.y > h-height-5 ? h-height-5 : pos.y ;
    return {x:x, y:y};
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
         dragBoundFunc = {this.dragBound}
         onDragEnd = {this.props.onDragEnd}

	/>	
      </Layer>
    )
  }
}

export default Comment;
