import React from 'react'
import { node } from 'prop-types'
import styles from './Arrange.module.css'

const Arrange = ({ children }) => (
    <div className={styles.arrange}>{children}</div>
)

Arrange.propTypes = {
    children: node.isRequired,
}

export default Arrange
