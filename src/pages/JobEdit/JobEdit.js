import React from 'react'
import { Card, IconInfo16 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { JobEditFormContainer } from '../../components/Forms'
import { JobDetails } from '../../components/JobDetails'
import styles from './JobEdit.module.css'

const infoLink =
    'https://docs.dhis2.org/en/use/user-guides/dhis-core-version-236/maintaining-the-system/scheduling.html'

const JobEdit = ({ job }) => {
    const { name, created, lastExecutedStatus, lastExecuted } = job

    return (
        <React.Fragment>
            <header className={styles.pageHeader}>
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
                <JobEditFormContainer job={job} />
            </Card>
        </React.Fragment>
    )
}

const { shape, string } = PropTypes

JobEdit.propTypes = {
    job: shape({
        name: string.isRequired,
        created: string.isRequired,
        lastExecutedStatus: string.isRequired,
        lastExecuted: string.isRequired,
    }).isRequired,
}

export default JobEdit
