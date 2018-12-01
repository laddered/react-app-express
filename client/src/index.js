import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

let AppContext = React.createContext();

class AppProvider extends Component {

    state = {
       isAdmin:false
    };

    render(){
        return (
            <AppContext.Provider value={{
                state: this.state
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

ReactDOM.render((
    <AppProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </AppProvider>
), document.getElementById('root'));
registerServiceWorker();
