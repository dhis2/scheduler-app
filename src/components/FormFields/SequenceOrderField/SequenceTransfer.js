import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { Field, Transfer } from '@dhis2/ui'
import SequenceTransferTitle from './SequenceTransferTitle'

const { bool, arrayOf, object, shape, func, array, string } = PropTypes

const SequenceTransfer = ({ options, input, meta }) => {
    const { onChange, value } = input
    const hasError = meta.touched && !!meta.error
    const errorMessage = hasError ? meta.error : ''

    return (
        <Field
            label={i18n.t('Job sequence')}
            validationText={errorMessage}
            error={hasError}
            required
        >
            <Transfer
                options={options}
                selected={value}
                filterable
                filterPlaceholder={i18n.t('Filter jobs')}
                enableOrderChange
                onChange={({ selected }) => onChange(selected)}
                leftHeader={
                    <SequenceTransferTitle title={i18n.t('Available jobs')} />
                }
                rightHeader={
                    <SequenceTransferTitle
                        title={i18n.t('Jobs in this sequence')}
                    />
                }
            />
        </Field>
    )
}

SequenceTransfer.propTypes = {
    input: shape({
        onChange: func.isRequired,
        value: array.isRequired,
    }).isRequired,
    meta: shape({
        error: string,
        touched: bool,
    }).isRequired,
    options: arrayOf(object).isRequired,
}

export default SequenceTransfer
