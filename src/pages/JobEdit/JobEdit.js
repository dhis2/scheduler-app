import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { Card } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { DiscardFormButton } from '../../components/Buttons'
import { InfoIcon } from '../../components/Icons'
import { JobEditFormContainer } from '../../components/Forms'
import styles from './JobEdit.module.css'

const infoLink =
    'https://docs.dhis2.org/master/en/user/html/dataAdmin_scheduling.html#dataAdmin_scheduling_config'

const JobEdit = ({ isPristine, setIsPristine, name: JOBNAME }) => (
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
                {i18n.t('Job: {{ JOBNAME }}', {
                    JOBNAME,
                    nsSeparator: '>',
                })}
            </h2>
        </header>
        <Card className={styles.card}>
            <header className={styles.cardHeader}>
                <h3 className={styles.cardHeaderTitle}>
                    {i18n.t('Configuration')}
                </h3>
                <a href={infoLink} className={styles.cardHeaderLink}>
                    <InfoIcon className={styles.cardHeaderInfo} />
                    {i18n.t('About job configuration')}
                </a>
            </header>
            <JobEditFormContainer setIsPristine={setIsPristine} />
        </Card>
    </React.Fragment>
)

const { bool, func, string } = PropTypes

JobEdit.propTypes = {
    isPristine: bool.isRequired,
    name: string.isRequired,
    setIsPristine: func.isRequired,
}

export default JobEdit
