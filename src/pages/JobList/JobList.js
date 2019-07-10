import React from 'react'
import { func, bool, object, arrayOf, string } from 'prop-types'
import { Card, Switch, InputField } from '@dhis2/ui-core'
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
    jobFilter,
    setJobFilter,
}) => (
    <React.Fragment>
        <Title priority={2}>Scheduled Jobs</Title>
        <Info />
        <Card>
            <Link to="/add">New job</Link>
            <Switch
                checked={showSystemJobs}
                disabled={isFetching}
                label="Show system jobs"
                name="show-system-jobs"
                onChange={event => setShowSystemJobs(event.target.checked)}
            />
            <InputField
                disabled={isFetching}
                label="Filter jobs by name"
                name="filter-jobs"
                onChange={event => setJobFilter(event.target.value)}
                value={jobFilter}
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
    jobFilter: string.isRequired,
    setJobFilter: func.isRequired,
}

export default JobList
