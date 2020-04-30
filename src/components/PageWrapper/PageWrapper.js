import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import styles from './PageWrapper.module.css'

const PageWrapper = ({ children }) => (
    <div className={styles.wrapper}>{children}</div>
)

PageWrapper.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PageWrapper
