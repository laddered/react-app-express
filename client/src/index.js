import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import {AppProvider} from "./components/appProvider";

ReactDOM.render((
    <BrowserRouter>
        <AppProvider>
        <App />
        </AppProvider>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
