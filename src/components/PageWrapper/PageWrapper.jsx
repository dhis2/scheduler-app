import React from 'react'
import PropTypes from 'prop-types'
import styles from './PageWrapper.module.css'

const PageWrapper = ({ children }) => (
    <div className={styles.wrapper}>{children}</div>
)

const { node } = PropTypes

PageWrapper.propTypes = {
    children: node.isRequired,
}

export default PageWrapper
