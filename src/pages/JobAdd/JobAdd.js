import React from 'react'
import { Card } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { InfoLink } from '../../components/InfoLink'
import { JobAddFormContainer } from '../../components/Forms'
import styles from './JobAdd.module.css'

const JobAdd = () => {
    return (
        <React.Fragment>
            <header className={styles.pageHeader}>
                <h2 className={styles.pageHeaderTitle}>{i18n.t('New Job')}</h2>
            </header>
            <Card className={styles.card}>
                <header className={styles.cardHeader}>
                    <h3 className={styles.cardHeaderTitle}>
                        {i18n.t('Configuration')}
                    </h3>
                    <InfoLink />
                </header>
                <JobAddFormContainer />
            </Card>
        </React.Fragment>
    )
}

export default JobAdd
