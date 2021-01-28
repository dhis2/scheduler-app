import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { Card, Switch, Input, Button, IconInfo16 } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import history from '../../services/history'
import { JobTable } from '../../components/JobTable'
import styles from './JobList.module.css'

const infoLink =
    'https://docs.dhis2.org/master/en/user/html/dataAdmin_scheduling.html#dataAdmin_scheduling_config'

const JobList = ({
    jobIds,
    jobEntities,
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
                <a
                    href={infoLink}
                    className={styles.headerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className={styles.headerLinkIcon}>
                        <IconInfo16 />
                    </span>
                    {i18n.t('About job configuration')}
                </a>
            </header>
            <Card>
                <div className={styles.controlContainer}>
                    <Input
                        dataTest="job-filter-input"
                        placeholder={i18n.t('Filter jobs')}
                        onChange={({ value }) => {
                            setJobFilter(value)
                        }}
                        value={jobFilter}
                    />
                    <div className={styles.controlRight}>
                        <Switch
                            dataTest="job-toggle-switch"
                            checked={showSystemJobs}
                            label={i18n.t('Show system jobs')}
                            onChange={({ checked }) => {
                                setShowSystemJobs(checked)
                            }}
                        />
                        <Button
                            dataTest="new-job-button"
                            onClick={() => {
                                history.push('/add')
                            }}
                        >
                            {i18n.t('New job')}
                        </Button>
                    </div>
                </div>
                <JobTable jobIds={jobIds} jobEntities={jobEntities} />
            </Card>
        </React.Fragment>
    )
}

const { bool, object, string, arrayOf, func } = PropTypes

JobList.propTypes = {
    jobEntities: object.isRequired,
    jobFilter: string.isRequired,
    jobIds: arrayOf(string).isRequired,
    setJobFilter: func.isRequired,
    setShowSystemJobs: func.isRequired,
    showSystemJobs: bool.isRequired,
}

export default JobList
