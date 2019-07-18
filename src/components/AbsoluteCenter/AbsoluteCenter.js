import React from 'react'
import { node, bool } from 'prop-types'
import styles from './AbsoluteCenter.module.css'

/**
 * Centers its children in the viewport vertically and horizontally. Children are rendered in a row
 * by default. The wrapper itself is not clickable but children are.
 */

const AbsoluteCenter = ({ children, vertical }) => {
    const classNames = [styles.center]

    if (vertical) {
        classNames.push(styles.vertical)
    }

    return (
        <div className={classNames.join(' ')}>
            <div className={styles.clickable}>{children}</div>
        </div>
    )
}

AbsoluteCenter.defaultProps = {
    vertical: false,
}

AbsoluteCenter.propTypes = {
    children: node.isRequired,
    vertical: bool,
}

export default AbsoluteCenter
