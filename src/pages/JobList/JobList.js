import React from 'react'
import { Card } from '@dhis2/ui-core'
import { Link } from 'react-router-dom'
import { Title } from '../../components/Title'

const JobList = () => (
    <React.Fragment>
        <Title priority={2}>Scheduled Jobs</Title>
        <Card>
            <Link to="/add">New job</Link>
        </Card>
    </React.Fragment>
)

export default JobList
