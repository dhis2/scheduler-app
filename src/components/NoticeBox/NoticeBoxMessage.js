import React from 'react'
import propTypes from '@dhis2/prop-types'
import styles from './NoticeBoxMessage.module.css'

const NoticeBoxMessage = ({ children }) => {
    if (!children) {
        return null
    }

    return <div className={styles.message}>{children}</div>
}

/* eslint-disable react/require-default-props */
NoticeBoxMessage.propTypes = {
    children: propTypes.node,
}
/* eslint-enable react/require-default-props */

export default NoticeBoxMessage
