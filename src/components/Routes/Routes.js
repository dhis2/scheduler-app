import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Router } from 'react-router'
import JobList from '../../pages/JobList'
import JobAdd from '../../pages/JobAdd'
import QueueAdd from '../../pages/QueueAdd'
import QueueEdit from '../../pages/QueueEdit'
import history from '../../services/history'
import JobViewOrEdit from './JobViewOrEdit'

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Redirect from="/edit/:id" to="/job/:id" />
            <Redirect from="/view/:id" to="/job/:id" />
            <Redirect from="/add" to="/job/add" />
            <Route exact path="/" component={JobList} />
            <Route path="/job/add" component={JobAdd} />
            <Route path="/job/:id" component={JobViewOrEdit} />
            <Route path="/queue/add" component={QueueAdd} />
            <Route path="/queue/:name" component={QueueEdit} />
        </Switch>
    </Router>
)

export default Routes
