import React, {Component} from 'react';
import {Route} from "react-router-dom";
import {MainColumns} from "./column";
import {AuthWindow} from "./auth";
import {RegWindow} from "./reg";
import {SignInBTN, LogInBTN} from "./mainButtons";

class StoreHeader extends Component {
    state = {
        data: 'No server connection.'
    };

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({data: res.express}))
            .catch(err => console.log(err));
    }

    callBackendAPI = async () => {
        let body;
        const response = await fetch('/express_backend');
        body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    };

    render() {
        return (
            <div className="App">
                <header className="Store-header">
                    <h1 className="App-title">Welcome to ReactStore</h1>
                    <SignInBTN/>
                    <LogInBTN/>
                </header>
                <p className="App-intro">{this.state.data}</p>
                <Route path="/" component={MainColumns} exact/>
                <Route path="/auth" component={AuthWindow}/>
                <Route path="/reg" component={RegWindow}/>
            </div>
        )
    }
}

export {StoreHeader};