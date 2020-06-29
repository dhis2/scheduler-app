import React from 'react'
import { Route } from 'react-router-dom'
import { Router } from 'react-router'
import { AuthWall } from '../AuthWall'
import { JobListContainer } from '../../pages/JobList'
import { JobEditContainer } from '../../pages/JobEdit'
import { JobAddContainer } from '../../pages/JobAdd'
import { NotAuthorized } from '../../pages/NotAuthorized'
import history from '../../services/history'

const Routes = () => (
    <Router history={history}>
        <AuthWall>
            <Route exact path="/" component={JobListContainer} />
            <Route path="/edit/:id" component={JobEditContainer} />
            <Route path="/add" component={JobAddContainer} />
        </AuthWall>
        <Route path="/notauthorized" component={NotAuthorized} />
    </Router>
)

export default Routes
