import React, { Component } from 'react';
import './App.css';
import {StoreHeader} from "./components/store-header";
import {Route} from "react-router-dom";
import {AuthzWindow} from "./components/authz";
import {RegWindow} from "./components/reg";

class App extends Component {
  render() {
      return(
          <React.Fragment>
              <Route path="/" component={StoreHeader} exact/>
              <Route path="/auth" component={AuthzWindow}/>
              <Route path="/reg" component={RegWindow}/>
          </React.Fragment>
      )
  }
}

export default App;
