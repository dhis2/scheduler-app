import React from 'react'
import { Card } from '@dhis2/ui'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { InfoLink } from '../../components/InfoLink'
import { JobEditFormContainer } from '../../components/Forms'
import { JobDetails } from '../../components/JobDetails'
import styles from './JobEdit.module.css'

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
                    <InfoLink />
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
        lastExecuted: string,
        lastExecutedStatus: string,
    }).isRequired,
}

export default JobEdit
