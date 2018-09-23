import React from "react";

import ADAMToolbar from '../components/toolbar';

class DFAHomePage extends React.Component {
  render() {
    return (
          <ADAMToolbar title={this.props.title} back={this.props.back} btns={[
            {body : "EDIT", onClick : () => {window.location.href = "https://www.youtube.com/watch?v=90KpM-ojTX4&t=29"}}
          ]} />
    );
  }
}

export default DFAHomePage;
