import React from 'react'
import { Route } from 'react-router-dom'
import { Router } from 'react-router'
import { AuthWall } from '../AuthWall'
import { JobListContainer as JobList } from '../../pages/JobList'
import { JobEdit } from '../../pages/JobEdit'
import { JobAdd } from '../../pages/JobAdd'
import { NotAuthorized } from '../../pages/NotAuthorized'
import history from '../../services/history'

const Routes = () => (
    <Router history={history}>
        <AuthWall>
            <Route exact path="/" component={JobList} />
            <Route path="/edit/:id" component={JobEdit} />
            <Route path="/add" component={JobAdd} />
        </AuthWall>
        <Route path="/notauthorized" component={NotAuthorized} />
    </Router>
)

export default Routes
