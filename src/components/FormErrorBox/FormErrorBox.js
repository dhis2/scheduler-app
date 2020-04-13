import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { NoticeBox } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import styles from './FormErrorBox.module.css'

const FormErrorBox = ({ submitError }) => {
    const hasGenericSubmitErrors = submitError.length > 0

    if (!hasGenericSubmitErrors) {
        return null
    }

    return (
        <NoticeBox
            error
            title={i18n.t('Something went wrong whilst creating your job')}
        >
            <ul className={styles.list}>
                {submitError.map(error => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
        </NoticeBox>
    )
}

const { array } = PropTypes

FormErrorBox.propTypes = {
    submitError: array.isRequired,
}

export default FormErrorBox
