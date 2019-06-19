import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../../utils/history';
import ListJobs from '../../pages/ListJobs';
import EditJob from '../../pages/EditJob';
import AddJob from '../../pages/AddJob';

const style = {
    paddingTop: '100px',
    width: '100%',
    maxWidth: '1000px',
    margin: '0 auto',
};

const Routes = () => (
    <Router history={history}>
        <div style={style}>
            <Route exact path="/" component={ListJobs} />
            <Route path="/edit/:id" component={EditJob} />
            <Route path="/add" component={AddJob} />
        </div>
    </Router>
);

export default Routes;
