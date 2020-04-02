import React from 'react'
import { node } from '@dhis2/prop-types'
import styles from './ArrangeFit.module.css'

/**
 * Shrink container to fit contents
 */

const ArrangeFit = ({ children }) => {
    return <div className={styles.fit}>{children}</div>
}

ArrangeFit.propTypes = {
    children: node.isRequired,
}

export default ArrangeFit
