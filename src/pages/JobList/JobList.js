import React from 'react'
import { Card, Checkbox, InputField, IconInfo16 } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { useJobSchedules } from '../../hooks'
import { useJobFilter, useShowSystemJobs } from '../../components/Store'
import { JobTable } from '../../components/JobTable'
import { LinkButton } from '../../components/LinkButton'
import { Spinner } from '../../components/Spinner'
import styles from './JobList.module.css'

const infoLink =
    'https://docs.dhis2.org/en/use/user-guides/dhis-core-version-236/maintaining-the-system/scheduling.html'

const JobList = () => {
    const [jobFilter, setJobFilter] = useJobFilter()
    const [showSystemJobs, setShowSystemJobs] = useShowSystemJobs()
    const { data, loading, error, refetch } = useJobSchedules()

    if (loading) {
        return <Spinner />
    }

    if (error) {
        throw error
    }

    // Filter jobs by the current jobFilter
    const applyJobFilter = (job) =>
        job.name.toLowerCase().includes(jobFilter.toLowerCase())

    // Filter jobs depending on the current showSystemJobs
    const applyShowSystemJobs = (job) =>
        // Jobs that are configurable are user jobs
        showSystemJobs ? true : job.configurable

    const jobs = data.filter(applyJobFilter).filter(applyShowSystemJobs)

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
                <JobTable jobs={jobs} refetch={refetch} />
            </Card>
        </React.Fragment>
    )
}

export default JobList
