import React from 'react'
import { node, bool } from '@dhis2/prop-types'
import styles from './AbsoluteCenter.module.css'

/**
 * Centers its children in the viewport vertically and horizontally. Children are rendered in a row
 * by default. The wrapper itself is not clickable but children are.
 */

const AbsoluteCenter = ({ children, vertical }) => {
    const classNames = [styles.clickable]

    if (vertical) {
        classNames.push(styles.vertical)
    }

    return (
        <div className={styles.center}>
            <div className={classNames.join(' ')}>{children}</div>
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
