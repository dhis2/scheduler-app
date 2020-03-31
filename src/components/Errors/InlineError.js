import React from 'react'
import { string, arrayOf } from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Title } from '../Title'
import styles from './InlineError.module.css'

const InlineError = ({ message, details }) => (
    <div className={styles.wrapper}>
        <Title priority={1}>{i18n.t('Something went wrong')}</Title>
        <p>{`${i18n.t('The error message was')}: ${message}`}</p>
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
