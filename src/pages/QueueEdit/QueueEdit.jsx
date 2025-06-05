import React from 'react'
import { Card, NoticeBox } from '@dhis2/ui'
import { useParams } from 'react-router-dom'
import i18n from '@dhis2/d2-i18n'
import { InfoLink } from '../../components/InfoLink'
import { Spinner } from '../../components/Spinner'
import { QueueEditFormContainer } from '../../components/Forms'
import { useQueueByName } from '../../hooks/queues'
import { useJobs } from '../../hooks/jobs'
import styles from './QueueEdit.module.css'

const QueueEdit = () => {
    const { name } = useParams()
    const queueResult = useQueueByName(name)
    const jobsResult = useJobs()

    if (queueResult.fetching || jobsResult.fetching) {
        return <Spinner />
    }

    if (queueResult.error || jobsResult.error) {
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
                    <InfoLink />
                </header>
                <QueueEditFormContainer
                    queue={queueResult.data}
                    jobs={jobsResult.data}
                />
            </Card>
        </React.Fragment>
    )
}

export default QueueEdit
