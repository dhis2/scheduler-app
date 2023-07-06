import React, { useState } from 'react'
import { Card, IconInfo16 } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { DiscardFormButton } from '../../components/Buttons'
import { SequenceAddFormContainer } from '../../components/Forms'
import styles from './SequenceAdd.module.css'

const SequenceAdd = () => {
    const [isPristine, setIsPristine] = useState(true)

    return (
        <React.Fragment>
            <header className={styles.pageHeader}>
                <DiscardFormButton
                    shouldConfirm={!isPristine}
                    className={styles.pageHeaderButton}
                    small
                >
                    {i18n.t('Back to all jobs')}
                </DiscardFormButton>
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
                <SequenceAddFormContainer setIsPristine={setIsPristine} />
            </Card>
        </React.Fragment>
    )
}

export default SequenceAdd
