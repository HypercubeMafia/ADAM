import React from "react";

import ADAMToolbar from '../components/toolbar';

class DFAHomePage extends React.Component {
  render() {
    return (
	<div>
          <ADAMToolbar title={this.props.title} back={this.props.back} />
	  <img src="/phallic_dfa.png" />
	</div>
    );
  }
}

export default DFAHomePage;
