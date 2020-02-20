import React from 'react'
import { func, bool, object, arrayOf, string } from 'prop-types'
import { Card, Switch, InputField } from '@dhis2/ui-core'
import { Link } from 'react-router-dom'
import { Title } from '../../components/Title'
import { Arrange, ArrangeFit, ArrangeFill } from '../../components/Arrange'
import { Info } from '../../components/Icons'
import { LinkButton } from '../../components/Buttons'
import JobListItem from './JobListItem'
import styles from './JobList.module.css'

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
                <ArrangeFit>
                    <InputField
                        disabled={isFetching}
                        label="Filter jobs by name"
                        onChange={({ value }) => setJobFilter(value)}
                        value={jobFilter}
                    />
                </ArrangeFit>
                <ArrangeFill>
                    <div className={styles.alignRight}>
                        <Switch
                            checked={showSystemJobs}
                            disabled={isFetching}
                            label="Show system jobs"
                            onChange={({ checked }) =>
                                setShowSystemJobs(checked)
                            }
                        />
                        <LinkButton as={Link} to="/add">
                            New job
                        </LinkButton>
                    </div>
                </ArrangeFill>
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
