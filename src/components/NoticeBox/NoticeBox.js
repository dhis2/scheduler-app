import React from 'react'
import cx from 'classnames'
import propTypes from '@dhis2/prop-types'
import NoticeBoxTitle from './NoticeBoxTitle'
import NoticeBoxIcon from './NoticeBoxIcon'
import NoticeBoxMessage from './NoticeBoxMessage'
import styles from './NoticeBox.module.css'

/**
 * This is a temporary local duplicate of the NoticeBox that will
 * be released with @dhis2/ui@5. It hasn't had a stable release
 * yet, so to avoid having to upgrade to an alpha, we're using this
 * local copy for the moment. After upgrading to ui@5, remove this
 * component (see this PR: https://github.com/dhis2/scheduler-app/pull/43)
 */
const NoticeBox = ({ children, title, warning, error }) => {
    let modifier = styles.info

    if (warning) {
        modifier = styles.warning
    }

    if (error) {
        modifier = styles.error
    }

    return (
        <div className={cx(styles.root, modifier)}>
            <NoticeBoxIcon error={error} warning={warning} />
            <div>
                <NoticeBoxTitle title={title} />
                <NoticeBoxMessage>{children}</NoticeBoxMessage>
            </div>
        </div>
    )
}

/* eslint-disable react/require-default-props */
NoticeBox.propTypes = {
    children: propTypes.node,
    error: propTypes.mutuallyExclusive(['error', 'warning'], propTypes.bool),
    title: propTypes.string,
    warning: propTypes.mutuallyExclusive(['error', 'warning'], propTypes.bool),
}
/* eslint-enable react/require-default-props */

export default NoticeBox
