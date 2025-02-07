import React from 'react'
import { NoticeBox, Card, Checkbox, InputField } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { useJobsAndQueues } from '../../hooks/jobs-and-queues'
import { useNameFilter, useShowSystemJobs } from '../../components/Store'
import { JobTable } from '../../components/JobTable'
import { LinkButton } from '../../components/LinkButton'
import { InfoLink } from '../../components/InfoLink'
import { Spinner } from '../../components/Spinner'
import styles from './JobAndQueueList.module.css'
import filterJobsAndQueues from './filter-jobs-and-queues'

const JobAndQueueList = () => {
    const [nameFilter, setNameFilter] = useNameFilter()
    const [showSystemJobs, setShowSystemJobs] = useShowSystemJobs()
    const { data, loading, error, refetch } = useJobsAndQueues()

    if (loading) {
        return <Spinner />
    }

    if (error) {
        return (
            <NoticeBox error title={i18n.t('Could not load jobs and queues')}>
                {i18n.t(
                    'Something went wrong whilst loading the jobs and queues. Try refreshing the page.'
                )}
            </NoticeBox>
        )
    }

    // Apply the current filter settings
    const jobsAndQueues = filterJobsAndQueues({
        nameFilter,
        showSystemJobs,
        jobsAndQueues: data,
    })

    return (
        <React.Fragment>
            <header className={styles.header}>
                <h1 className={styles.headerTitle}>
                    {i18n.t('Scheduled jobs')}
                </h1>
                <InfoLink />
            </header>
            <Card>
                <div className={styles.controlContainer}>
                    <InputField
                        dataTest="name-filter-input"
                        label={i18n.t('Filter by name')}
                        onChange={({ value }) => {
                            setNameFilter(value)
                        }}
                        value={nameFilter}
                        type="search"
                        role="searchbox"
                        name="name-filter"
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
                        <LinkButton to="/job/add">
                            {i18n.t('New job')}
                        </LinkButton>
                        <LinkButton to="/queue/add">
                            {i18n.t('New queue')}
                        </LinkButton>
                    </div>
                </div>
                <JobTable jobsAndQueues={jobsAndQueues} refetch={refetch} />
            </Card>
        </React.Fragment>
    )
}

export default JobAndQueueList
