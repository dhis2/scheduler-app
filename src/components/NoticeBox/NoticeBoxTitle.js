import React from 'react'
import propTypes from '@dhis2/prop-types'
import styles from './NoticeBoxTitle.module.css'

const NoticeBoxTitle = ({ title }) => {
    if (!title) {
        return null
    }

    return <h6 className={styles.title}>{title}</h6>
}

/* eslint-disable react/require-default-props */
NoticeBoxTitle.propTypes = {
    title: propTypes.string,
}
/* eslint-enable react/require-default-props */

export default NoticeBoxTitle
