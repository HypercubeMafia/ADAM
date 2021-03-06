import React from "react";
import update from 'immutability-helper';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ADAMToolbar from '../components/toolbar';
import MachineCanvas from '../components/machine_canvas';
import NameStateDialog from '../components/name_state_dialog';
import CommentDialog from '../components/comment_dialog';

const PageStatus = {
  default : 1,
  addState : 2,
  stateSelected : 3,
  addComment : 4,
  commentSelected : 5,
  addTransitionSrc : 6,
  addTransitionDest : 7,
  transitionSelected : 8
}

class EditPage extends React.Component {
  state = {
    status : PageStatus.default, //current action being performed
    machine : { // machine description
      states : [],
      startState : null, //okey of start state, null if no start state is selected
      comments : [],
      transitions : []
    },
    clickedState : -1, //state which is currently clicked, -1 for no state
    nameStateOpen : false,

    clickedComment : -1, //comment which is currently clicked, -1 for no comment
    isComment : false,
    isCommentEdit : false,
    isTransitionLabel : false,
    clickState : null,

    clickedTransition : -1, //transition which is currently clicked, -1 for no transition

    // transition in progress; state is a reference, location is "N", "E", "S", "W"
    newTransitionSrc : {state: null, loc: ""},

    // these variables are used to give a unique identifier to the canvas components
    // they should be updated whenever the component is created or moved
    nextStateKey : 0,
    nextTransitionKey : 0,

    // canvas click handler is called after component click handlers
    // this is used to allow components to be selected properly
    somethingJustClicked : false
  };

  getModeText = () => {
    switch(this.state.status){
      case PageStatus.addState:
        return "Click on the canvas to draw a state.";
      case PageStatus.addComment:
        return "Click on the canvas to add a comment.";
      case PageStatus.addTransitionSrc:
        return "Click on a purple attachment point to choose a source state.";
      case PageStatus.addTransitionDest:
        return "Click on a purple attachment point to choose a destination state.";
      default:
        return '\u200b';
    }
  }

  unselectAll = () => {
    this.setState({
      status: PageStatus.default, //now in default page status
      clickedState: -1,
      clickedComment: -1,
      clickedTransition: -1,
      newTransitionSrc : {state: null, loc: ""}
    });
  }

  handleCanvasClick = e => {
    switch (this.state.status) {
      case PageStatus.addState:
        this.setState({
          machine:
            update(this.state.machine, {states: {
              $push: [{ key:"s"+this.state.nextStateKey, // used for rerendering
                        okey:"s"+this.state.nextStateKey, //used by transitions
                        x:e.evt.offsetX,
                        y:e.evt.offsetY,
                        accepting:false,
                        name:""}] // add a state centered at the click location to states array
            }}),
          status: PageStatus.default, //return to default page status
          nextStateKey: this.state.nextStateKey + 1
        });
        break;
      case PageStatus.addComment:
        this.setState({isComment:true, clickState:e});
        break;
      default:
        if (!this.state.somethingJustClicked) {
          this.unselectAll();
        }
        break;
    }
    this.setState({ somethingJustClicked : false });
  }

  handleStateClick = i => {
    // disable state clicking when we are trying to add a transition
    if (this.state.status === PageStatus.addTransitionSrc ||
        this.state.status === PageStatus.addTransitionDest) {
            return;
    }

    let clickme = true;
    if (this.state.clickedState === i) {
        clickme = false;
    }

    this.unselectAll();
    if (clickme) {
      this.setState({
        status: PageStatus.stateSelected, //now in state selected page status
        clickedState: i, //indicate that this state has been clicked
        somethingJustClicked: true
      });
    }
  }

  handleStateDrag = (e,i) => {
    let dx = e.target.attrs.x;
    let dy = e.target.attrs.y;

    let newx = this.state.machine.states[i].x + dx;
    let newy = this.state.machine.states[i].y + dy;

    this.setState({
      machine: update(this.state.machine, {states: {[i]: {
      $merge: {
        key:"s"+this.state.nextStateKey, //update the state key
        x: newx, y: newy} //set the location of the state to be the end location of the drag
      }}}),
      nextStateKey: this.state.nextStateKey + 1
    });
  }

  nameStateOpen = () => {
    this.setState({nameStateOpen: true});
  }

  handleNameStateClose = () => {
    this.setState({nameStateOpen: false});
  }

  handleNameStateSubmit = (name) => {
    this.setState({
      machine: update(this.state.machine, {states: {[this.state.clickedState]: {
        $merge: {name:name}
      }}}),
      nameStateOpen: false});
  }

  // returns {canSubmit: bool, helperText: string}
  validateNewStateName = (name) => {
    if (name === "") return {canSubmit: true, helperText: ""};

    var maxLength = 4;
    if (name.length > maxLength) {
        return {canSubmit: false, helperText: `Name must be less than ${maxLength} characters.`}
      }

    for (var i=0; i < this.state.machine.states.length; ++i) {
      if (i !== this.state.clickedState && this.state.machine.states[i].name === name) {
        return {canSubmit: true, helperText: "Warning: Name already in use."};
      }
    }

    return {canSubmit: true, helperText: ""};
  }

  handleCommentDrag = (e,i) => {
    this.setState({
      machine: update(this.state.machine, {comments: {[i]: {
        $merge: {x: e.target.x(), y: e.target.y()}  //set the location of the state to be the end location of the drag
      }}})
    });
  }

  handleCommentClick = i => {
    let clickme = true;
    if (this.state.clickedComment === i) {
        clickme = false;
    }

    this.unselectAll();
    if (clickme) {
      this.setState({
        status: PageStatus.commentSelected, //now in state selected page status
        clickedComment: i, //indicate that this state has been clicked
        somethingJustClicked: true
      });
    }
  }

  makeComment = (text) => {
    this.setState({
        machine:
          update(this.state.machine, {comments: {
            $push: [{x:this.state.clickState.evt.offsetX, y:this.state.clickState.evt.offsetY, com:text}]
          }}),
        status: PageStatus.default //return to default page status
      });
  }

  editComment = (text) => {
    this.setState({
        machine:
          update(this.state.machine, {comments: {[this.state.clickedComment]: { com: {
            $set: text
          }}}})
      });
  }

  labelTransition = (text) => {
    this.setState({
        machine:
          update(this.state.machine, {transitions: {[this.state.clickedTransition]: { txt: {
            $set: text
          }}}})
      });
  }

  handleOptionsClose = () => {
        this.setState({isComment: false,status:PageStatus.default});
  }

  handleOptionsCloseEdit = () => {
        this.setState({isCommentEdit: false});
  }

  handleOptionsCloseLable = () => {
        this.setState({isTransitionLabel: false});
  }

  handleAttachmentPointClick = (s, loc) => {
    if (this.state.status === PageStatus.addTransitionSrc) {
      this.setState({
        status : PageStatus.addTransitionDest,
        newTransitionSrc : { state: s, loc: loc },
        somethingJustClicked: true
      });
    } else if (this.state.status === PageStatus.addTransitionDest) {
      this.setState({
        status : PageStatus.default,
        machine : update(this.state.machine, { transitions: {
          $push: [{
                    key : "t"+this.state.nextTransitionKey,
                    srcState : this.state.newTransitionSrc.state,
                    srcLoc : this.state.newTransitionSrc.loc,
                    destState : s,
                    destLoc : loc,
                    txt : ""
                 }]
        }}),
        newTransitionSrc: {state: null, loc: ""},
        nextTransitionKey: this.state.nextTransitionKey + 1,
        somethingJustClicked: true
      })
    }
  }

  handleTransitionClick = i => {
    let clickme = true;
    if (this.state.clickedTransition === i) {
        clickme = false;
    }

    this.unselectAll();
    if (clickme) {
      this.setState({
        status: PageStatus.transitionSelected, //now in state selected page status
        clickedTransition: i, //indicate that this state has been clicked
        somethingJustClicked: true
      });
    }
  }

  getStateToolbar = () => {
    return (<ADAMToolbar title="MODIFY STATE"
      back={() => this.setState({ status: PageStatus.default, clickedState: -1 }) }
      btns={[
        {
          body: "Make Start State",
          onClick: () => this.setState({
            machine: update(this.state.machine, {startState: {
              $set: this.state.machine.states[this.state.clickedState].okey
            }})
          })
        },
        {
          body: (this.state.machine.states[this.state.clickedState].accepting)
            ? "Make Non-Accepting State"
            : "Make Accepting State",
          onClick: () => this.setState({
            machine: update(this.state.machine, {states: {[this.state.clickedState]: {accepting: {
              $set: !(this.state.machine.states[this.state.clickedState].accepting)
            }}}})
          })
        },
        {
          body: "Change Name",
          onClick: () => this.nameStateOpen()
        },
        {
          body: "Delete",
          onClick: () => {
            //returns true if the transition is connected to the clickedState
            let connected = (t) =>
              t.srcState === this.state.machine.states[this.state.clickedState].okey ||
              t.destState === this.state.machine.states[this.state.clickedState].okey;

            let ts = this.state.machine.transitions;
            let to_splice = []; // indices of transitions connected to clickedState
            for (let i=ts.length-1; i>=0; i--) { // in reverse order so we splice from back to front
              if (connected(ts[i])) {
                to_splice.push([i,1]); //list [i,1] means remove one element at that index
              }
            }

            // we must set startState to null if we delete the current start state
            let new_start =
              this.state.machine.startState === this.state.clickedState
              ? null
              : this.state.machine.startState;

            this.setState({
              machine: update(this.state.machine, {
                states: { $splice: [[this.state.clickedState, 1]] },
                transitions: { $splice: to_splice },
                startState: { $set: new_start }
              }),
              clickedState: -1,
              status: PageStatus.default
            });
          }
        },
        {
          body: "Cancel",
          onClick: () => this.setState({
            clickedState: -1,
            status: PageStatus.default
          })
        }
      ]}
    />);
  }

  getCommentToolbar = () => {
    return (<ADAMToolbar title="MODIFY COMMENT"
      back={() => this.setState({ status: PageStatus.default, clickedComment: -1 }) }
      btns={[
        {
          body: "Edit",
          onClick: () => this.setState({
            isCommentEdit : true
          })
        },
        {
          body: "Delete",
          onClick: () => this.setState({
            machine: update(this.state.machine, {comments: {
              $splice: [[this.state.clickedComment, 1]]
            }}),
            clickedComment: -1,
            status: PageStatus.default
          })
        },
        {
          body: "Cancel",
          onClick: () => this.setState({
            clickedComment: -1,
            status: PageStatus.default
          })
        }
      ]}
    />);
  }

  getTransitionToolbar = () => {
    return (<ADAMToolbar title="MODIFY TRANSITION"
      back={() => this.setState({ status: PageStatus.default, clickedTransition: -1 }) }
      btns={[
        {

          body: "Edit Label",
          onClick: () => this.setState({
            isTransitionLabel : true})},
          {
          body: "Delete",
          onClick: () => this.setState({
            machine: update(this.state.machine, {transitions: {
              $splice: [[this.state.clickedTransition, 1]]
            }}),
            clickedTransition: -1,
            status: PageStatus.default

          })
        },
        {
          body: "Cancel",
          onClick: () => this.setState({
            clickedTransition: -1,
            status: PageStatus.default
          })
        }
      ]}
    />);
  }

  getMainToolbar = () => {
    return (<ADAMToolbar
      title="EDIT"
      back={this.props.back}
      btns={[
        {
          body: "Add State",
          onClick: () => this.setState({ status: PageStatus.addState })
        },
        {
          body: "Add Comment",
          onClick: () => this.setState({ status: PageStatus.addComment })
        },
        {
          body: "Add Transition",
          onClick: () => this.setState({ status: PageStatus.addTransitionSrc })
        },
        {
          body: "Export Image",
          onClick: () => {
            var dataURL = document.getElementsByTagName("canvas")[0].toDataURL("image/png");
            var link = document.createElement("a");
            link.download = 'machine.png';
            link.href = dataURL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
      ]}
    />);
  }

  getEditingToolbar = () => {
    return (<ADAMToolbar
      title="EDIT"
      back={this.props.back}
      btns={[
        {
          body: "Add State",
          onClick: () => this.setState({ status: PageStatus.addState })
        },
        {
          body: "Add Comment",
          onClick: () => this.setState({ status: PageStatus.addComment })
        },
        {
          body: "Add Transition",
          onClick: () => this.setState({ status: PageStatus.addTransitionSrc })
        },
        {
          body: "Export Image",
          onClick: () => {
            var dataURL = document.getElementsByTagName("canvas")[0].toDataURL("image/png");
            var link = document.createElement("a");
            link.download = 'machine.png';
            link.href = dataURL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        },
        {
          body: "Cancel",
          onClick: () => this.setState({
            clickedTransition: -1,
            status: PageStatus.default
          })
        }
      ]}
    />);
  }

  render() {
    var toolbar = ((s) => {
      if (s === PageStatus.stateSelected) {
        return this.getStateToolbar();
      } else if (s === PageStatus.commentSelected) {
        return this.getCommentToolbar();
      } else if (s === PageStatus.transitionSelected) {
        return this.getTransitionToolbar();
      }
        else if (s === PageStatus.default){
        return this.getMainToolbar();
      }
      else{
        return this.getEditingToolbar();
      }
  })(this.state.status);

    return (
      <div>
        {toolbar}

        <Paper elevation={1} style={{margin:32, padding:0}}>
          <Typography variant="headline" component="h3">
            {this.getModeText()}
          </Typography>
        </Paper>
    	  <CommentDialog isOpen={this.state.isComment} onClose={this.handleOptionsClose}
                 	 type={this.props.type} update={this.makeComment} def={this.state.clickedComment === -1 ? "" : this.state.machine.comments[this.state.clickedComment].com}
                   dialog_type={"Comment"}/>
        <CommentDialog isOpen={this.state.isCommentEdit} onClose={this.handleOptionsCloseEdit}
                	 type={this.props.type} update={this.editComment} def={this.state.clickedComment === -1 ? "" : this.state.machine.comments[this.state.clickedComment].com}
                   dialog_type={"Comment"}/>
        <CommentDialog isOpen={this.state.isTransitionLabel} onClose={this.handleOptionsCloseLable}
                 	 type={this.props.type} update={this.labelTransition} def={this.state.clickedTransition === -1 ? "" : this.state.machine.transitions[this.state.clickedTransition].txt}
                   dialog_type={"Label"}/>
        <Paper elevation={1} style={{margin:32, padding:0}}>
          <MachineCanvas
            machine={this.state.machine}
            onClick={this.handleCanvasClick} //handle canvas click (for add state)
            clickedState={this.state.clickedState}
            onStateClick={this.handleStateClick} //handles state click (for highlighting)
            onStateDrag={this.handleStateDrag} //handles state drag (to move state)
            clickedComment={this.state.clickedComment}
            onCommentDrag={this.handleCommentDrag} //handles comment drag to move comment
            onCommentClick={this.handleCommentClick} //handles comment click (for highlighting)
            onAttachPointClick={this.handleAttachmentPointClick}
            addingTransition={this.state.status === PageStatus.addTransitionSrc || this.state.status === PageStatus.addTransitionDest}
            transitionSrc={this.state.newTransitionSrc}
            clickedTransition={this.state.clickedTransition}
            onTransitionClick={this.handleTransitionClick}
            text={CommentDialog.commentText}
	        />
        </Paper>

      <NameStateDialog
        name={this.state.clickedState === -1 ? "" : this.state.machine.states[this.state.clickedState].name}
        isOpen={this.state.nameStateOpen}
        onClose={this.handleNameStateClose}
        onSubmit={this.handleNameStateSubmit}
        validate={this.validateNewStateName}
      />

      </div>
    );
  }
}

export default EditPage;
