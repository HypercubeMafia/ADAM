import React from "react";
import MachineSelectPage from './pages/machine_select.js';
import DFAHomePage from './pages/dfa_home.js'

import { store, view } from 'react-easy-state';

/*
import { store } from 'react-easy-state'

// store the central data and logic of the application in a global app store
// use 'appStore' instead of 'this' in the store methods to make them passable as callbacks
const appStore = store({
  contacts: [],
  addContact (contact) {
    contact.name = contact.name || 'Placeholder'
    contact.email = contact.email || 'Placeholder'
    appStore.contacts.push(contact)
  },
  deleteContact (contact) {
    const idx = appStore.contacts.indexOf(contact)
    appStore.contacts.splice(idx, 1)
  }
})

export default appStore
*/

const machines = store({
    machines: [
        { title: "Sample DFA", type: "dfa" },
        { title: "Sample NFA", type: "nfa" },
        { title: "Sample TM", type: "tm" },
        { title: "Another DFA", type: "dfa" }
    ],

    addMachine(machine) {
        machines.machines.push(machine);
    }
});

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

/*
copy = {};
for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
}
return copy;
*/
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

export default view(App);
