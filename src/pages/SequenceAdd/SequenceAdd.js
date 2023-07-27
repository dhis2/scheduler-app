import React from 'react'
import { Card, IconInfo16 } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { SequenceAddFormContainer } from '../../components/Forms'
import styles from './SequenceAdd.module.css'

const SequenceAdd = () => {
    return (
        <React.Fragment>
            <header className={styles.pageHeader}>
                <h2 className={styles.pageHeaderTitle}>
                    {i18n.t('New Sequence')}
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
                <SequenceAddFormContainer />
            </Card>
        </React.Fragment>
    )
}

export default SequenceAdd
