import React from 'react'
import { object, arrayOf, string } from 'prop-types'
import { Card } from '@dhis2/ui-core'
import { Link } from 'react-router-dom'
import { Title } from '../../components/Title'
import { Info } from '../../components/Icons'
import JobListItem from './JobListItem'

const JobList = ({ jobIds, jobEntities }) => (
    <React.Fragment>
        <Title priority={2}>Scheduled Jobs</Title>
        <Info />
        <Card>
            <Link to="/add">New job</Link>
            <table>
                <thead>
                    <tr>
                        <th>Job name</th>
                        <th>Type</th>
                        <th>Frequency</th>
                        <th>Next run in</th>
                        <th>Status</th>
                        <th>On/off</th>
                    </tr>
                </thead>
                <tbody>
                    {jobIds.map(id => (
                        <JobListItem key={id} job={jobEntities[id]} />
                    ))}
                </tbody>
            </table>
        </Card>
    </React.Fragment>
)

JobList.propTypes = {
    jobIds: arrayOf(string).isRequired,
    jobEntities: object.isRequired,
}

export default JobList
