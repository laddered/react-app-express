import React, { Component } from 'react';
import './App.css';
import {StoreHeader} from "./components/store-header";
import {Route} from "react-router-dom";
import {AuthWindow} from "./components/auth";
import {RegWindow} from "./components/reg";

class App extends Component {
  render() {
      return(
          <React.Fragment>
              <Route path="/" component={StoreHeader} exact/>
              <Route path="/auth" component={AuthWindow}/>
              <Route path="/reg" component={RegWindow}/>
          </React.Fragment>
      )
  }
}

export default App;
