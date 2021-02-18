import React from 'react'
import { Route } from 'react-router-dom'
import { Router } from 'react-router'
import { JobListContainer } from '../../pages/JobList'
import { JobEditContainer } from '../../pages/JobEdit'
import { JobAddContainer } from '../../pages/JobAdd'
import history from '../../services/history'

const Routes = () => (
    <Router history={history}>
        <Route exact path="/" component={JobListContainer} />
        <Route path="/edit/:id" component={JobEditContainer} />
        <Route path="/add" component={JobAddContainer} />
    </Router>
)

export default Routes
