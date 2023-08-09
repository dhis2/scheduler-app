import React from 'react'
import { Card, IconInfo16, NoticeBox } from '@dhis2/ui'
import { useParams } from 'react-router-dom'
import i18n from '@dhis2/d2-i18n'
import { Spinner } from '../../components/Spinner'
import { SequenceEditFormContainer } from '../../components/Forms'
import { useJobScheduleById } from '../../hooks/job-schedules'
import styles from './SequenceEdit.module.css'

const SequenceEdit = () => {
    const { id } = useParams()
    const { data, fetching, error } = useJobScheduleById(id)

    if (fetching) {
        return <Spinner />
    }

    if (error) {
        return (
            <NoticeBox
                error
                title={i18n.t('Could not load requested schedule')}
            >
                {i18n.t(
                    'Something went wrong whilst loading the requested schedule. Make sure it has not been deleted and try refreshing the page.'
                )}
            </NoticeBox>
        )
    }

    const { name } = data

    return (
        <React.Fragment>
            <header className={styles.pageHeader}>
                <h2 className={styles.pageHeaderTitle}>
                    {i18n.t('Sequence: {{ name }}', {
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
                            'A sequence is a collection of jobs that are executed in order, one after another as they finish.'
                        )}
                    </span>
                </header>
                <SequenceEditFormContainer sequence={data} />
            </Card>
        </React.Fragment>
    )
}

export default SequenceEdit
