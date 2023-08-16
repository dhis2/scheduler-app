import React from 'react'
import PropTypes from 'prop-types'
import {
    Card,
    IconInfo16,
    Box,
    SingleSelectField,
    SingleSelectOption,
    InputField,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { LinkButton } from '../../components/LinkButton'
import { JobDetails } from '../../components/JobDetails'
import translateCron from '../../services/translate-cron'
import { jobTypesMap } from '../../services/server-translations'
import styles from './JobView.module.css'

const infoLink =
    'https://docs.dhis2.org/en/use/user-guides/dhis-core-version-236/maintaining-the-system/scheduling.html'

const JobView = ({ job }) => {
    const {
        name,
        created,
        lastExecutedStatus,
        lastExecuted,
        jobType,
        cronExpression,
    } = job

    return (
        <React.Fragment>
            <header className={styles.pageHeader}>
                <h2 className={styles.pageHeaderTitle}>
                    {i18n.t('System job: {{ name }}', {
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
                <Box maxWidth="600px">
                    <InputField
                        label={i18n.t('Name')}
                        disabled
                        value={name}
                        name="name"
                    />
                </Box>
                <Box marginTop="16px" maxWidth="400px">
                    <SingleSelectField
                        name="jobType"
                        label={i18n.t('Job type')}
                        disabled
                        selected={jobType}
                    >
                        <SingleSelectOption
                            value={jobType}
                            label={jobTypesMap[jobType]}
                        />
                    </SingleSelectField>
                </Box>
                <Box marginTop="16px" maxWidth="400px">
                    <InputField
                        label={i18n.t('CRON Expression')}
                        name="cronExpression"
                        disabled
                        value={cronExpression}
                        helpText={translateCron(cronExpression)}
                    />
                </Box>
                <Box marginTop="24px">
                    <LinkButton className={styles.pageHeaderButton} to="/">
                        {i18n.t('Back to all jobs')}
                    </LinkButton>
                </Box>
            </Card>
        </React.Fragment>
    )
}

const { shape, string } = PropTypes

JobView.propTypes = {
    job: shape({
        name: string.isRequired,
        created: string.isRequired,
        lastExecutedStatus: string.isRequired,
        lastExecuted: string.isRequired,
        jobType: string.isRequired,
        cronExpression: string.isRequired,
    }).isRequired,
}

export default JobView
