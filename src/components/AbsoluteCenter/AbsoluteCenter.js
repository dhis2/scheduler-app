import React from 'react'
import { node, bool } from 'prop-types'
import styles from './AbsoluteCenter.module.css'

/**
 * Centers its children in the viewport vertically and horizontally. Children are not clickable due
 * to pointer-events: none, to allow underlying elements to still respond to clicks. Children are
 * rendered in a row by default.
 */

const AbsoluteCenter = ({ children, vertical }) => {
    const classNames = [styles.center]

    if (vertical) {
        classNames.push(styles.vertical)
    }

    return <div className={classNames.join(' ')}>{children}</div>
}

AbsoluteCenter.defaultProps = {
    vertical: false,
}

AbsoluteCenter.propTypes = {
    children: node.isRequired,
    vertical: bool,
}

export default AbsoluteCenter
