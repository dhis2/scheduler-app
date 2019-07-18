import React from 'react'
import { string, arrayOf } from 'prop-types'
import { Title } from '../Title'
import styles from './InlineError.module.css'

const InlineError = ({ message, details }) => (
    <div className={styles.wrapper}>
        <Title priority={1}>Something went wrong</Title>
        <p>The error message was: &quot;{message}&quot;</p>
        {details.length > 0 && (
            <React.Fragment>
                <Title priority={2}>Details</Title>
                {details.map(detail => (
                    <p key={detail}>{detail}</p>
                ))}
            </React.Fragment>
        )}
    </div>
)

InlineError.defaultProps = {
    details: [],
}

InlineError.propTypes = {
    message: string.isRequired,
    details: arrayOf(string),
}

export default InlineError
