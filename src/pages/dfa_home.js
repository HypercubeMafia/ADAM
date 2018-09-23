import React from "react";

import ADAMToolbar from '../components/toolbar';

class DFAHomePage extends React.Component {
  render() {
    return (
          <ADAMToolbar title={this.props.title} back={this.props.back} btns={[
            {body : "EDIT", onClick : this.props.edit} 
          ]} />
    );
  }
}

export default DFAHomePage;
