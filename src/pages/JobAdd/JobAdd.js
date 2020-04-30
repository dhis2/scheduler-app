import React, { useState } from 'react'
import { Card } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { DiscardFormButton } from '../../components/Buttons'
import { Info } from '../../components/Icons'
import { JobFormContainer } from '../../components/Forms'
import styles from './JobAdd.module.css'

const infoLink =
    'https://docs.dhis2.org/master/en/user/html/dataAdmin_scheduling.html#dataAdmin_scheduling_config'

const JobAdd = () => {
    const [isPristine, setIsPristine] = useState(true)

    return (
        <React.Fragment>
            <DiscardFormButton shouldConfirm={!isPristine}>
                {i18n.t('Back to all jobs')}
            </DiscardFormButton>
            <h2>{i18n.t('New Job')}</h2>
            <Card>
                <header className={styles.header}>
                    <h3 className={styles.title}>{i18n.t('Configuration')}</h3>
                    <Info />
                    <a href={infoLink}>{i18n.t('About job configuration')}</a>
                </header>
                <JobFormContainer setIsPristine={setIsPristine} />
            </Card>
        </React.Fragment>
    )
}

export default JobAdd
