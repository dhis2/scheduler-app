import React from 'react'
import PropTypes from 'prop-types'
import { NoticeBox } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { useDataQuery } from '@dhis2/app-runtime'
import { Spinner } from '../Spinner'
import { getAuthorized } from './selectors'
import styles from './AuthWall.module.css'

const query = {
    me: {
        resource: 'me',
    },
}

const AuthWall = ({ children }) => {
    const { loading, error, data } = useDataQuery(query)

    if (loading) {
        return <Spinner />
    }

    if (error) {
        return (
            <div className={styles.noticeBoxWrapper}>
                <NoticeBox error title={i18n.t('Something went wrong')}>
                    {i18n.t(
                        'Something went wrong whilst retrieving user permissions.'
                    )}
                </NoticeBox>
            </div>
        )
    }

    const isAuthorized = getAuthorized(data.me)

    if (!isAuthorized) {
        return (
            <div className={styles.noticeBoxWrapper}>
                <NoticeBox error title={i18n.t('Not authorized')}>
                    {i18n.t(
                        "You don't have access to the Job Scheduler. Contact a system administrator to request access."
                    )}
                </NoticeBox>
            </div>
        )
    }

    return <React.Fragment>{children}</React.Fragment>
}

const { node } = PropTypes

AuthWall.propTypes = {
    children: node.isRequired,
}

export default AuthWall
