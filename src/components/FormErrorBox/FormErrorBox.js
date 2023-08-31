import React from 'react'
import PropTypes from 'prop-types'
import { NoticeBox } from '@dhis2/ui'
import styles from './FormErrorBox.module.css'

const FormErrorBox = ({ submitError, title }) => {
    const hasGenericSubmitErrors = submitError.length > 0

    if (!hasGenericSubmitErrors) {
        return null
    }

    return (
        <NoticeBox error title={title}>
            <ul className={styles.list}>
                {submitError.map((error) => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
        </NoticeBox>
    )
}

const { array, string } = PropTypes

FormErrorBox.propTypes = {
    submitError: array.isRequired,
    title: string.isRequired,
}

export default FormErrorBox
