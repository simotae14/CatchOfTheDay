import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './css/style.css';
import App from './components/App';

import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

// define the Routing
const Root = () => {
    return (
        <Router>
            <div>
                <Route
                    exact
                    path="/"
                    component={StorePicker}
                />
                <Route
                    exact
                    path="/store/:storeId"
                    component={App}
                />
                <Route
                    component={NotFound}
                />
            </div>
        </Router>
    )
}

render(<Root />, document.querySelector('#main'));