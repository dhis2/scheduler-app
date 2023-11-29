import React from 'react'
import { Card } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { InfoLink } from '../../components/InfoLink'
import { QueueAddFormContainer } from '../../components/Forms'
import styles from './QueueAdd.module.css'

const QueueAdd = () => {
    return (
        <React.Fragment>
            <header className={styles.pageHeader}>
                <h2 className={styles.pageHeaderTitle}>
                    {i18n.t('New queue')}
                </h2>
            </header>
            <Card className={styles.card}>
                <header className={styles.cardHeader}>
                    <h3 className={styles.cardHeaderTitle}>
                        {i18n.t('Configuration')}
                    </h3>
                    <InfoLink />
                </header>
                <QueueAddFormContainer />
            </Card>
        </React.Fragment>
    )
}

export default QueueAdd
