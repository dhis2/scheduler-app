import React from 'react'
import { func, bool, object, arrayOf, string } from 'prop-types'
import { Card, Switch, InputField } from '@dhis2/ui-core'
import { Link } from 'react-router-dom'
import { Title } from '../../components/Title'
import { Arrange } from '../../components/Arrange'
import { Info } from '../../components/Icons'
import { LinkButton } from '../../components/Buttons'
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
        <Arrange>
            <Title priority={2}>Scheduled Jobs</Title>
            <Info />
        </Arrange>
        <Card>
            <Arrange>
                <InputField
                    filled
                    disabled={isFetching}
                    label="Filter jobs by name"
                    name="filter-jobs"
                    onChange={event => setJobFilter(event.target.value)}
                    value={jobFilter}
                />
                <Arrange.Push direction="right">
                    <Switch
                        checked={showSystemJobs}
                        disabled={isFetching}
                        label="Show system jobs"
                        name="show-system-jobs"
                        onChange={event =>
                            setShowSystemJobs(event.target.checked)
                        }
                    />
                    <LinkButton as={Link} to="/add">
                        New job
                    </LinkButton>
                </Arrange.Push>
            </Arrange>
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
