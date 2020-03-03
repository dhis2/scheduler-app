import React from 'react'
import { Route } from 'react-router-dom'
import { Router } from 'react-router'
import { JobListContainer as JobList } from '../../pages/JobList'
import { JobEdit } from '../../pages/JobEdit'
import { JobAdd } from '../../pages/JobAdd'
import history from '../../services/history'

const Routes = () => (
    <Router history={history}>
        <Route exact path="/" component={JobList} />
        <Route path="/edit/:id" component={JobEdit} />
        <Route path="/add" component={JobAdd} />
    </Router>
)

export default Routes
