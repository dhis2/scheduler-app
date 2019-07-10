import React from 'react'
import { func, bool, object, arrayOf, string } from 'prop-types'
import { Card, Switch } from '@dhis2/ui-core'
import { Link } from 'react-router-dom'
import { Title } from '../../components/Title'
import { Info } from '../../components/Icons'
import JobListItem from './JobListItem'

const JobList = ({
    jobIds,
    jobEntities,
    isFetching,
    showSystemJobs,
    setShowSystemJobs,
}) => (
    <React.Fragment>
        <Title priority={2}>Scheduled Jobs</Title>
        <Info />
        <Card>
            <Link to="/add">New job</Link>
            <Switch
                disabled={isFetching}
                checked={showSystemJobs}
                label="Show system jobs"
                name="show-system-jobs"
                onChange={() => setShowSystemJobs(!showSystemJobs)}
            />
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
    isFetching: bool.isRequired,
    showSystemJobs: bool.isRequired,
    setShowSystemJobs: func.isRequired,
}

export default JobList
