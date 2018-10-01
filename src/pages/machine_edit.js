import React from "react";

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
  render() {
    return (
    <div>
      <ADAMToolbar title="EDIT" back={this.props.back} />

      <Paper elevation={1} style={{margin:32, padding:16}}>
        <MachineCanvas />
      </Paper>
    </div>



    );
  }
}


export default EditPage;
