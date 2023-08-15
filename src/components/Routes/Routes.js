import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Router } from 'react-router'
import JobList from '../../pages/JobList'
import JobAdd from '../../pages/JobAdd'
import SequenceAdd from '../../pages/SequenceAdd'
import SequenceEdit from '../../pages/SequenceEdit'
import history from '../../services/history'
import CheckJobType from './CheckJobType'

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Redirect from="/edit/:id" to="/job/:id" />
            <Redirect from="/view/:id" to="/job/:id" />
            <Redirect from="/add" to="/job/add" />
            <Route exact path="/" component={JobList} />
            <Route path="/job/add" component={JobAdd} />
            <Route path="/job/:id" component={CheckJobType} />
            <Route path="/queue/add" component={SequenceAdd} />
            <Route path="/queue/:id" component={SequenceEdit} />
        </Switch>
    </Router>
)

export default Routes
