import React from "react";
import { Layer, Text, Group, Rect } from 'react-konva';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.text = React.createRef();
    this.state = {
      dragBound : pos => {
        const max_w = this.props.size.width-this.text.current.getTextWidth()-15;
        const max_h = this.props.size.height-this.text.current.getHeight()-5;
        const x = pos.x < 5 ? 5 : pos.x > max_w ? max_w : pos.x ;
        const y = pos.y < 5 ? 5 : pos.y > max_h ? max_h : pos.y ;
        return {x : x, y : y};
      }
    };    
  }

  //used to force resizing of the box when text is edited
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.comment.com !== this.props.comment.com) {
      this.forceUpdate();
    }
  }

  render() {
    var commentText = (<Text
      ref={this.text}
      text = {this.props.comment.com}
      fontSize = {18}
      padding = {5}
      align = {'left'}
      width={250}
    />)

    var commentBox = (<Rect
      width={(this.text.current) ? this.text.current.getTextWidth()+10 : 0}
      height={(this.text.current) ? this.text.current.getHeight() : 0}
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
        {commentText}
        {commentBox}
        </Group>
      </Layer>
    )
  }
}

export default Comment;
