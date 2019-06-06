import React from 'react';
import history from 'utils/history';
import { Router, Route } from 'react-router-dom';
import List from 'components/jobOverview/List';
import EditJob from 'components/jobContent/EditJob';
import AddJob from 'components/jobContent/AddJob';

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
