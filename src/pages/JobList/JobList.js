import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import { Card } from '@dhis2/ui-core'
import { Link } from 'react-router-dom'
import { Title } from '../../components/Title'

const JobList = ({ jobs }) => (
    <React.Fragment>
        <Title priority={2}>Scheduled Jobs</Title>
        <Card>
            <Link to="/add">New job</Link>
            {jobs.map(({ id, displayName }) => (
                <div key={id}>{displayName}</div>
            ))}
        </Card>
    </React.Fragment>
)

JobList.propTypes = {
    jobs: arrayOf(
        shape({
            id: string,
            displayName: string,
        })
    ).isRequired,
}

export default JobList
