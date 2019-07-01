import React from 'react'
import { node } from 'prop-types'
import styles from './PageWrapper.module.css'

const PageWrapper = ({ children }) => (
    <div className={styles.wrapper}>{children}</div>
)

PageWrapper.propTypes = {
    children: node.isRequired,
}

export default PageWrapper
