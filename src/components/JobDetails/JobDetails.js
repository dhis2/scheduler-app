import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import moment from 'moment'
import { jobStatusMap } from '../../services/server-translations'
import styles from './JobDetails.module.css'

const JobDetails = ({ created, lastExecutedStatus, lastExecuted }) => {
    // Using Date.now allows for easier mocking
    const now = Date.now()
    const createdFromNow = moment(created).from(now)
    const translatedStatus = jobStatusMap[lastExecutedStatus]
    const lastRunFromNow = lastExecuted ? moment(lastExecuted).from(now) : ''

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>{i18n.t('Job details')}</h4>
            <div className={styles.details}>
                <div>
                    {i18n.t('Created {{ createdFromNow }}.', {
                        createdFromNow,
                    })}
                </div>
                {lastRunFromNow && (
                    <div>
                        {i18n.t('Last run {{ lastRunFromNow }}.', {
                            lastRunFromNow,
                        })}
                    </div>
                )}
                {translatedStatus && (
                    <div>
                        {i18n.t('Last run status: {{ translatedStatus }}.', {
                            translatedStatus,
                            nsSeparator: '>',
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

const { string } = PropTypes

JobDetails.propTypes = {
    created: string.isRequired,
    lastExecutedStatus: string.isRequired,
    lastExecuted: string,
}

export default JobDetails
