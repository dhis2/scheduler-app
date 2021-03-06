import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { Card, IconInfo16 } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { DiscardFormButton } from '../../components/Buttons'
import { JobEditFormContainer } from '../../components/Forms'
import { JobDetails } from '../../components/JobDetails'
import styles from './JobEdit.module.css'

const infoLink =
    'https://docs.dhis2.org/en/use/user-guides/dhis-core-version-236/maintaining-the-system/scheduling.html'

const JobEdit = ({
    isPristine,
    setIsPristine,
    name,
    created,
    lastExecutedStatus,
    lastExecuted,
}) => (
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
                {i18n.t('Job: {{ name }}', {
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
                <a
                    href={infoLink}
                    className={styles.cardHeaderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className={styles.cardHeaderInfo}>
                        <IconInfo16 />
                    </span>
                    {i18n.t('About job configuration')}
                </a>
            </header>
            <div className={styles.jobDetails}>
                <JobDetails
                    created={created}
                    lastExecutedStatus={lastExecutedStatus}
                    lastExecuted={lastExecuted}
                />
            </div>
            <JobEditFormContainer setIsPristine={setIsPristine} />
        </Card>
    </React.Fragment>
)

const { bool, func, string } = PropTypes

JobEdit.propTypes = {
    created: string.isRequired,
    isPristine: bool.isRequired,
    lastExecuted: string.isRequired,
    lastExecutedStatus: string.isRequired,
    name: string.isRequired,
    setIsPristine: func.isRequired,
}

export default JobEdit
