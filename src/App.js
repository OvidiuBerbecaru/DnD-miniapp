import React from 'react';
import Layouts from './views/Layouts/Layouts'
import Configuration from './views/Configuration/Configuration'
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Layouts} />
        <Route path='/configuration' component={Configuration} />
      </Switch>
    </div>
  );
}

export default App;
