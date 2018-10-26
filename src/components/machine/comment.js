import React from "react";
import { Layer, Text, Group, Rect } from 'react-konva';
import ReactDOM from 'react-dom';

class Comment extends React.Component {
  state={ dragBound : pos => {return{x:pos.x,y:pos.y}}, height : 0 }
  comment_width = 250;
  componentDidMount() {

    this.setState({dragBound : pos => {
      const height = ReactDOM.findDOMNode(this).children[0].getHeight();
      const w = this.props.size.width;
      const h = this.props.size.height;
      const x = pos.x < 5 ? 5 : pos.x > w-this.state.width+5 ? w-this.state.width+5 : pos.x ;
      const y = pos.y < 5 ? 5 : pos.y > h-this.state.height-5 ? h-this.state.height-5 : pos.y ;
      return {x : x, y : y};
    },
    width : this.textNode.getTextWidth()+20,
    height : this.textNode.getHeight(),
    });
  }

  render() {

    var commentText = (<Text
        text = {this.props.comment.com}
        fontSize = {18}
        padding = {5}
        align = {'left'}
        width={this.comment_width}
        ref={node => {
          this.textNode = node;
        }}
      />)

    var commentBox = (<Rect
          width={this.state.width}
          height={this.state.height}
          stroke={this.props.clicked ? "green" : "white"}
          strokeWidth={2}
      />)

    return (
      <Layer>

      <Group
        draggable
        x={this.props.comment.x}
        y={this.props.comment.y}
        dragBoundFunc = {this.state.dragBound}
        onDragEnd = {this.props.onDragEnd}
        onClick = {this.props.onClick}
      >
      {commentBox}
      {commentText}
      </Group>
      </Layer>
    )
  }
}

export default Comment;
