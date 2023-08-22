import React from 'react'
import { Card, IconInfo16, NoticeBox } from '@dhis2/ui'
import { useParams } from 'react-router-dom'
import i18n from '@dhis2/d2-i18n'
import { Spinner } from '../../components/Spinner'
import { SequenceEditFormContainer } from '../../components/Forms'
import { useQueueByName } from '../../hooks/queues'
import { useJobs } from '../../hooks/jobs'
import styles from './SequenceEdit.module.css'

const SequenceEdit = () => {
    const { name } = useParams()
    const queueFetch = useQueueByName(name)
    const jobsFetch = useJobs()

    if (queueFetch.fetching || jobsFetch.fetching) {
        return <Spinner />
    }

    if (queueFetch.error || jobsFetch.error) {
        return (
            <NoticeBox error title={i18n.t('Could not load requested queue')}>
                {i18n.t(
                    'Something went wrong whilst loading the requested queue. Make sure it has not been deleted and try refreshing the page.'
                )}
            </NoticeBox>
        )
    }

    return (
        <React.Fragment>
            <header className={styles.pageHeader}>
                <h2 className={styles.pageHeaderTitle}>
                    {i18n.t('Queue: {{ name }}', {
                        name,
                        nsSeparator: '>',
                    })}
                </h2>
            </header>
            <Card className={styles.card}>
                <header className={styles.cardHeader}>
                    <h3 className={styles.cardHeaderTitle}>
                        {i18n.t('Configuration')}
                    </h3>
                    <span className={styles.cardHeaderInfo}>
                        <span className={styles.cardHeaderIcon}>
                            <IconInfo16 />
                        </span>
                        {i18n.t(
                            'A queue is a collection of jobs that are executed in order, one after another as they finish.'
                        )}
                    </span>
                </header>
                <SequenceEditFormContainer
                    queue={queueFetch.data}
                    jobs={jobsFetch.data}
                />
            </Card>
        </React.Fragment>
    )
}

export default SequenceEdit
