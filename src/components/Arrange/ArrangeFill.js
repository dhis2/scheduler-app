import React from 'react'
import { node } from 'prop-types'
import styles from './ArrangeFill.module.css'

/**
 * Fills all available space
 */

const ArrangeFill = ({ children }) => {
    return <div className={styles.fill}>{children}</div>
}

ArrangeFill.propTypes = {
    children: node.isRequired,
}

export default ArrangeFill
