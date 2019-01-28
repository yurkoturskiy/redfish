import React, { Component } from 'react';

import GrapheneProvider from "./containers/GrapheneProvider"
import { Notes } from "./containers/Notes"

class App extends Component {
  render() {
    return (
      <GrapheneProvider>
        <div>
          <Notes/>
        </div>
      </GrapheneProvider>
    );
  }
}

export default App;
