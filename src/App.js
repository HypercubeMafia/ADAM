import React from "react";
import MachineSelectPage from './pages/machine_select.js';
import DFAHomePage from './pages/dfa_home.js'

class App extends React.Component {
  state = { currentPage : "machine-select",
            currentMachine : null };

  toMachineSelect = () => {
    this.setState({ currentPage : "machine-select",
                    currentMachine : null  });
  };

  toDFAHome = (title) => {
    this.setState({ currentPage : "dfa-home",
                    currentMachine : title });
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
