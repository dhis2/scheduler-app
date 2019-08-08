import React from 'react'
import { node, oneOf } from 'prop-types'
import styles from './Push.module.css'

const Push = ({ children, direction }) => (
    <div className={styles[direction]}>{children}</div>
)

Push.propTypes = {
    children: node.isRequired,
    direction: oneOf(['up', 'down', 'left', 'right']).isRequired,
}

export default Push
