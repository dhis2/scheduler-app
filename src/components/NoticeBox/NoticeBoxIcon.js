import React from 'react'
import propTypes from '@dhis2/prop-types'
import cx from 'classnames'
import { InfoIcon, WarningIcon, ErrorIcon } from './Icons'
import styles from './NoticeBoxIcon.module.css'

const NoticeBoxIcon = ({ warning, error }) => {
    let modifier = styles.info
    let Icon = InfoIcon

    if (warning) {
        modifier = styles.warning
        Icon = WarningIcon
    }

    if (error) {
        modifier = styles.error
        Icon = ErrorIcon
    }

    return (
        <div>
            <Icon className={cx(styles.icon, modifier)} />
        </div>
    )
}

/* eslint-disable react/require-default-props */
NoticeBoxIcon.propTypes = {
    error: propTypes.mutuallyExclusive(['error', 'warning'], propTypes.bool),
    warning: propTypes.mutuallyExclusive(['error', 'warning'], propTypes.bool),
}
/* eslint-enable react/require-default-props */

export default NoticeBoxIcon
