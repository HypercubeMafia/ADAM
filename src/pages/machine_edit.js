import React from "react";
import update from 'immutability-helper';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ADAMToolbar from '../components/toolbar';
import MachineCanvas from '../components/machine_canvas';
import CommentDialog from '../components/comment_dialog';

const PageStatus = {
  default : 1,
  addState : 2,
  stateSelected : 3,
  addComment : 4
}

class EditPage extends React.Component {
  state = {
    status : PageStatus.default, //current action being performed
    machine : { // machine description
      states : [],
      comments : []
      
    },
    clickedState : -1, //state which is currently clicked, -1 for no state
    startState : -1, //-1 for no state
    isComment:false,
    clickState:null

  };

  getModeText = () => {
    switch(this.state.status){
      case PageStatus.addState:
        return "Click on the canvas to draw a state.";
      case PageStatus.addComment:
	return "Click on the canvas to add a comment.";
      default:
        return '\u200b';
    }
  }

  buttons = () => [
    {
      body: "Add State",
      onClick: () => this.setState({ status: PageStatus.addState })
    },
    { 
      body: "Add Comment",
      onClick: () => this.setState({ status: PageStatus.addComment })
    }

  ];

  handleCanvasClick = e => {
    console.log(this.state.machine)
    console.log(this.state.PageStatus)
    if (this.state.status === PageStatus.addState) {
      this.setState({
        machine:
          update(this.state.machine, {states: {
            $push: [{x:e.evt.offsetX, y:e.evt.offsetY}] // add a state centered at the click location to states array
          }}),
        status: PageStatus.default //return to default page status
      });
     
    }
    else if (this.state.status === PageStatus.addComment) {
 	this.setState({isComment:true, clickState:e});
     }

  }

  handleStateClick = i => {
    if (this.state.clickedState === i) { //this state is currently selected, so we unselect it
      this.setState({
        status: PageStatus.default, //return to default page status
        clickedState: -1 //no state is currently clicked
      });
    } else { //this state is currently unselected
      this.setState({
        status: PageStatus.stateSelected, //now in state selected page status
        clickedState: i //indicate that this state has been clicked
      });
    }
  }

  handleStateDrag = (e,i) => {
    this.setState({
      machine: update(this.state.machine, {states: {[i]: {
        $merge: {x: e.target.x(), y: e.target.y()}  //set the location of the state to be the end location of the drag
      }}})
    });
  }

  handleCommentDrag = (e,i) => {
    this.setState({
      machine: update(this.state.machine, {comments: {[i]: {
        $merge: {x: e.target.x(), y: e.target.y()}  //set the location of the state to be the end location of the drag
      }}})
    });
  }

  makeComment = (text) => {
    this.setState({
        machine:
          update(this.state.machine, {comments: {
            $push: [{x:this.state.clickState.evt.offsetX, y:this.state.clickState.evt.offsetY, com:text}] // add a state centered at the click location to states array
          }}),
        status: PageStatus.default //return to default page status
      });
  }

  handleOptionsClose = () => {
        this.setState({isComment: false,status:PageStatus.default});
  };

  render() {
    var main_toolbar = ( <ADAMToolbar title="EDIT" back={this.props.back}
      btns={[
        {
          body: "Add State",
          onClick: () => this.setState({ status: PageStatus.addState })
        },
	{
          body: "Add Comment",
          onClick: () => this.setState({ status: PageStatus.addComment })
        }
      ]} />);

    var state_toolbar = ( <ADAMToolbar title="MODIFY STATE"
      back={() => this.setState({ status: PageStatus.default, clickedState: -1 }) }
      btns={[
        {
          body: "Make Start State",
          onClick: () => this.setState({ startState: this.state.clickedState })
        }
      ]} />);

    var toolbar = this.state.status === PageStatus.stateSelected ? state_toolbar : main_toolbar;

    return (
      <div>
        {toolbar}

        <Paper elevation={1} style={{margin:32, padding:0}}>
          <Typography variant="headline" component="h3">
            {this.getModeText()}
          </Typography>
        </Paper>
	<CommentDialog isOpen={this.state.isComment} onClose={this.handleOptionsClose}
                 	 type={this.props.type} update={this.makeComment}/>
        <Paper elevation={1} style={{margin:32, padding:0}}>
          <MachineCanvas
            machine={this.state.machine}
            clickedState={this.state.clickedState}
            startState={this.state.startState}
            onClick={this.handleCanvasClick} //handle canvas click (for add state)
            onStateClick={this.handleStateClick} //handles state click (for highlighting)
            onStateDrag={this.handleStateDrag} //handles state drag (to move state)
	    onCommentDrag={this.handleCommentDrag} //handles comment drag to move comment 
            text={CommentDialog.commentText}
	  />
        </Paper>
      </div>
    );
  }
}

export default EditPage;
