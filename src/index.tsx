import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import history from './history';
import { Route, Router, Switch } from 'react-router-dom';

ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route path="/" component={App} />
        </Switch>
    </Router>,
    document.getElementById('root')
);
