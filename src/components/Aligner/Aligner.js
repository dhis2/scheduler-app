import React from 'react'
import { node, bool } from 'prop-types'
import styles from './Aligner.module.css'

/**
 * Convenience component to force elements horizontally or vertically and center them along that
 * axis. Aligns horizontally by default.
 */

const Aligner = ({ children, vertical }) => {
    const className = vertical ? styles.vertical : styles.horizontal

    return <div className={className}>{children}</div>
}

Aligner.defaultProps = {
    vertical: false,
}

Aligner.propTypes = {
    children: node.isRequired,
    vertical: bool,
}

export default Aligner
