import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { Card } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { DiscardFormButton } from '../../components/Buttons'
import { InfoIcon } from '../../components/Icons'
import { JobFormContainer } from '../../components/Forms'
import styles from './JobAdd.module.css'

const infoLink =
    'https://docs.dhis2.org/master/en/user/html/dataAdmin_scheduling.html#dataAdmin_scheduling_config'

const JobAdd = ({ isPristine, setIsPristine }) => (
    <React.Fragment>
        <header className={styles.pageHeader}>
            <DiscardFormButton
                shouldConfirm={!isPristine}
                className={styles.pageHeaderButton}
                small
            >
                {i18n.t('Back to all jobs')}
            </DiscardFormButton>
            <h2 className={styles.pageHeaderTitle}>{i18n.t('New Job')}</h2>
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
                    <InfoIcon className={styles.cardHeaderInfo} />
                    {i18n.t('About job configuration')}
                </a>
            </header>
            <JobFormContainer setIsPristine={setIsPristine} />
        </Card>
    </React.Fragment>
)

const { bool, func } = PropTypes

JobAdd.propTypes = {
    isPristine: bool.isRequired,
    setIsPristine: func.isRequired,
}

export default JobAdd
