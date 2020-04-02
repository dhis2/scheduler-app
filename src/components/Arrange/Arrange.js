import React from 'react'
import { node, bool } from '@dhis2/prop-types'
import styles from './Arrange.module.css'

/**
 * Arranges children either horizontally or vertically. Arranges horizontally by default.
 */

const Arrange = ({ children, vertical }) => {
    const className = vertical ? styles.vertical : styles.horizontal

    return <div className={className}>{children}</div>
}

Arrange.defaultProps = {
    vertical: false,
}

Arrange.propTypes = {
    children: node.isRequired,
    vertical: bool,
}

export default Arrange
