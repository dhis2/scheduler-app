import React from 'react'
import { node } from 'prop-types'
import styles from './Wrapper.module.css'

const Wrapper = ({ children }) => (
    <div className={styles.wrapper}>{children}</div>
)

Wrapper.propTypes = {
    children: node.isRequired,
}

export default Wrapper
