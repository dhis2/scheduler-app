import React from 'react'
import { func, bool, object, arrayOf, string } from 'prop-types'
import { Card, Switch, Input, Button } from '@dhis2/ui-core'
import { Info } from '../../components/Icons'
import history from '../../services/history'
import JobListTable from './JobListTable'
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
        <div className={styles.titleContainer}>
            <h1 className={styles.title}>Scheduled Jobs</h1>
            <Info />
        </div>
        <Card>
            <div className={styles.controlContainer}>
                <Input
                    placeholder="Filter jobs"
                    onChange={({ value }) => setJobFilter(value)}
                    value={jobFilter}
                />
                <div className={styles.controlRight}>
                    <Switch
                        checked={showSystemJobs}
                        disabled={isFetching}
                        label="Show system jobs"
                        onChange={({ checked }) => setShowSystemJobs(checked)}
                    />
                    <Button onClick={() => history.push('/add')}>
                        New job
                    </Button>
                </div>
            </div>
            <JobListTable jobIds={jobIds} jobEntities={jobEntities} />
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
