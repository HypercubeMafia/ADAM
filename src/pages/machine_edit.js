import React from "react";

import Paper from '@material-ui/core/Paper';

import ADAMToolbar from '../components/toolbar';

const styles = {
  canvas : {
    width : "100%",
    height : 800
  }
}

class MachineCanvas extends React.Component {

  render() {
    return (
      <canvas style={styles.canvas} />
    )
  }
}


class EditPage extends React.Component {
  buttons = () => [
    {
      body: "Add State",
      onClick: this.addState
    }
  ];

  addState = () => {
     console.log("Add State");
  };

  render() {
    return (
    <div>
      <ADAMToolbar title="EDIT" back={this.props.back} btns={this.buttons()}/>

      <Paper elevation={1} style={{margin:32, padding:16}}>
        <MachineCanvas />
      </Paper>
    </div>



    );
  }
}


export default EditPage;
