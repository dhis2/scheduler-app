import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { Card, Switch, Input, Button } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { InfoIcon } from '../../components/Icons'
import history from '../../services/history'
import JobListTable from './JobListTable'
import styles from './JobList.module.css'

const JobList = ({
    jobIds,
    jobEntities,
    isLoading,
    showSystemJobs,
    setShowSystemJobs,
    jobFilter,
    setJobFilter,
}) => {
    return (
        <React.Fragment>
            <header className={styles.header}>
                <h1 className={styles.headerTitle}>
                    {i18n.t('Scheduled jobs')}
                </h1>
                <InfoIcon className={styles.headerIcon} />
            </header>
            <Card>
                <div className={styles.controlContainer}>
                    <Input
                        placeholder={i18n.t('Filter jobs')}
                        onChange={({ value }) => {
                            setJobFilter(value)
                        }}
                        value={jobFilter}
                    />
                    <div className={styles.controlRight}>
                        <Switch
                            checked={showSystemJobs}
                            disabled={isLoading}
                            label={i18n.t('Show system jobs')}
                            onChange={({ checked }) => {
                                setShowSystemJobs(checked)
                            }}
                        />
                        <Button
                            onClick={() => {
                                history.push('/add')
                            }}
                        >
                            {i18n.t('New job')}
                        </Button>
                    </div>
                </div>
                <JobListTable jobIds={jobIds} jobEntities={jobEntities} />
            </Card>
        </React.Fragment>
    )
}

const { bool, object, string, arrayOf, func } = PropTypes

JobList.propTypes = {
    isLoading: bool.isRequired,
    jobEntities: object.isRequired,
    jobFilter: string.isRequired,
    jobIds: arrayOf(string).isRequired,
    setJobFilter: func.isRequired,
    setShowSystemJobs: func.isRequired,
    showSystemJobs: bool.isRequired,
}

export default JobList
