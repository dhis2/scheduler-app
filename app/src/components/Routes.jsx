import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../utils/history';
import List from './jobOverview/List';
import EditJob from './jobContent/EditJob';
import AddJob from './jobContent/AddJob';

const style = {
    paddingTop: '100px',
    width: '100%',
    maxWidth: '1000px',
    margin: '0 auto',
};

const Routes = () => (
    <Router history={history}>
        <div style={style}>
            <Route exact path="/" component={List} />
            <Route path="/edit/:id" component={EditJob} />
            <Route path="/add" component={AddJob} />
        </div>
    </Router>
);

export default Routes;
