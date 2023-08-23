import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import { Field, Transfer } from '@dhis2/ui'
import QueueTransferTitle from './QueueTransferTitle'
import CustomOption from './CustomOption'

const { bool, arrayOf, shape, func, array, string } = PropTypes

const QueueTransfer = ({ options, input, meta }) => {
    const { onChange, value } = input
    const hasError = meta.touched && !!meta.error
    const errorMessage = hasError ? meta.error : ''

    return (
        <Field
            label={i18n.t('Job queue')}
            validationText={errorMessage}
            error={hasError}
            required
        >
            <Transfer
                options={options}
                selected={value}
                renderOption={CustomOption}
                filterable
                filterPlaceholder={i18n.t('Filter jobs')}
                enableOrderChange
                onChange={({ selected }) => onChange(selected)}
                leftHeader={
                    <QueueTransferTitle title={i18n.t('Available jobs')} />
                }
                rightHeader={
                    <QueueTransferTitle title={i18n.t('Jobs in this queue')} />
                }
            />
        </Field>
    )
}

QueueTransfer.propTypes = {
    input: shape({
        onChange: func.isRequired,
        value: array.isRequired,
    }).isRequired,
    meta: shape({
        error: string,
        touched: bool,
    }).isRequired,
    options: arrayOf(
        shape({
            name: string,
            id: string,
            type: string,
        })
    ).isRequired,
}

export default QueueTransfer
