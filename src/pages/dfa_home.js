import React from "react";

import ADAMToolbar from '../components/toolbar';

class DFAHomePage extends React.Component {
  render() {
    return (
          <ADAMToolbar title={this.props.title} back={this.props.back} />
    );
  }
}

export default DFAHomePage;
