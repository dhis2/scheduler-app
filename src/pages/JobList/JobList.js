import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { Card, Checkbox, InputField, IconInfo16 } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { JobTable } from '../../components/JobTable'
import { LinkButton } from '../../components/Temporary'
import styles from './JobList.module.css'

const infoLink =
    'https://docs.dhis2.org/en/use/user-guides/dhis-core-version-236/maintaining-the-system/scheduling.html'

const JobList = ({
    jobs,
    showSystemJobs,
    setShowSystemJobs,
    jobFilter,
    setJobFilter,
}) => (
    <React.Fragment>
        <header className={styles.header}>
            <h1 className={styles.headerTitle}>{i18n.t('Scheduled jobs')}</h1>
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
                <InputField
                    dataTest="job-filter-input"
                    label={i18n.t('Filter jobs')}
                    onChange={({ value }) => {
                        setJobFilter(value)
                    }}
                    value={jobFilter}
                    type="search"
                    role="searchbox"
                    name="job-filter"
                />
                <div className={styles.controlRight}>
                    <Checkbox
                        dataTest="job-toggle-checkbox"
                        checked={showSystemJobs}
                        label={i18n.t('Include system jobs in list')}
                        onChange={({ checked }) => {
                            setShowSystemJobs(checked)
                        }}
                    />
                    <LinkButton to="/add">{i18n.t('New job')}</LinkButton>
                </div>
            </div>
            <JobTable jobs={jobs} />
        </Card>
    </React.Fragment>
)

const { bool, object, string, arrayOf, func } = PropTypes

JobList.propTypes = {
    jobFilter: string.isRequired,
    jobs: arrayOf(object).isRequired,
    setJobFilter: func.isRequired,
    setShowSystemJobs: func.isRequired,
    showSystemJobs: bool.isRequired,
}

export default JobList
