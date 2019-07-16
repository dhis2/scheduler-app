import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { JobListContainer as JobList } from '../../pages/JobList'
import { JobEdit } from '../../pages/JobEdit'
import { JobAddContainer as JobAdd } from '../../pages/JobAdd'

const Routes = () => (
    <HashRouter>
        <Route exact path="/" component={JobList} />
        <Route path="/edit/:id" component={JobEdit} />
        <Route path="/add" component={JobAdd} />
    </HashRouter>
)

export default Routes
