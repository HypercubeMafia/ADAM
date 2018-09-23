import React from "react";

import ADAMToolbar from '../components/toolbar';

class EditPage extends React.Component {
  render() {
    return (
          <ADAMToolbar title="EDIT" back={this.props.back} />
    );
  }
}

export default EditPage;

