import React from 'react'
import { Route } from 'react-router-dom'
import { Router } from 'react-router'
import JobList from '../../pages/JobList'
import JobEdit from '../../pages/JobEdit'
import JobView from '../../pages/JobView'
import JobAdd from '../../pages/JobAdd'
import SequenceAdd from '../../pages/SequenceAdd'
import history from '../../services/history'

const Routes = () => (
    <Router history={history}>
        <Route exact path="/" component={JobList} />
        <Route path="/edit/:id" component={JobEdit} />
        <Route path="/view/:id" component={JobView} />
        <Route path="/add" component={JobAdd} />
        <Route path="/add-sequence" component={SequenceAdd} />
    </Router>
)

export default Routes
