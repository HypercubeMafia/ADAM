import React from "react";
import MachineSelectPage from './pages/machine_select.js';
import DFAHomePage from './pages/dfa_home.js'

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
    } else {
      return <DFAHomePage back={this.toMachineSelect} title={this.state.currentMachine} />;
    }
  }
}

export default App;
