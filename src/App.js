import React from "react";
import MachineSelectPage from './pages/machine_select.js';
import DFAHomePage from './pages/dfa_home.js'
import EditPage from './pages/machine_edit.js'

class App extends React.Component {

  constructor(props) {
    super(props);
    // Need to manually set state data at beginning,
    // or else it is null for first render call
    this.state = {
      currentPage : "machine-select",
      currentMachine : null,
    };
    document.title = "ADAM: Another Drawer of Alan's Machines";
  }

  toEdit = (title) => {
    this.setState({ currentPage : "machine-edit",
                    currentMachine : title.toUpperCase() });
    document.title = title;
  };

  toMachineSelect = () => {
    this.setState({ currentPage : "machine-select",
                    currentMachine : null  });
    document.title = "ADAM: Another Drawer of Alan's Machines";
  };

  toDFAHome = (title) => {
    this.setState({ currentPage : "dfa-home",
                    currentMachine : title.toUpperCase() });
    document.title = title;
  };

  render() {
    if (this.state.currentPage === "machine-select") {
      return <MachineSelectPage todfa={this.toDFAHome} />;
    }
    else if (this.state.currentPage === "machine-edit"){
      return <EditPage  back={() => {this.toDFAHome(this.state.currentMachine)}}/>
    }
    else {
      return <DFAHomePage back={this.toMachineSelect} title={this.state.currentMachine}
	edit={() => {this.toEdit(this.state.currentMachine)}}/>;
    }
  }
}

export default App;
