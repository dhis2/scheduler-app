import React, { useState } from 'react'
import { Card, IconInfo16 } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { DiscardFormButton } from '../../components/Buttons'
import { SequenceAddFormContainer } from '../../components/Forms'
import styles from './SequenceAdd.module.css'

const infoLink =
    'https://docs.dhis2.org/en/use/user-guides/dhis-core-version-236/maintaining-the-system/scheduling.html'

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
                    <a
                        href={infoLink}
                        className={styles.cardHeaderLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className={styles.cardHeaderInfo}>
                            <IconInfo16 />
                        </span>
                        {i18n.t('About sequence configuration')}
                    </a>
                </header>
                <SequenceAddFormContainer setIsPristine={setIsPristine} />
            </Card>
        </React.Fragment>
    )
}

export default SequenceAdd
