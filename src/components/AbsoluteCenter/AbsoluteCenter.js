import React from 'react'
import { node } from 'prop-types'
import styles from './AbsoluteCenter.module.css'

/**
 * Centers its children in the viewport vertically and horizontally. Children are not clickable due
 * to pointer-events: none, to allow underlying elements to still respond to clicks. Children are
 * rendered in a row by default.
 */

const AbsoluteCenter = ({ children }) => (
    <div className={styles.center}>{children}</div>
)

AbsoluteCenter.propTypes = {
    children: node.isRequired,
}

export default AbsoluteCenter
