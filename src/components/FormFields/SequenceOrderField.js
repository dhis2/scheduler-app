import PropTypes from 'prop-types'
import React from 'react'
import {
    ReactFinalForm,
    Transfer,
    composeValidators,
    hasValue,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { useQueueables } from '../../hooks/queueables'

const { Field } = ReactFinalForm
const { arrayOf, object, shape, func, array } = PropTypes

// Customized transfer component used in the form field below
const SequenceTransfer = ({ options, input }) => {
    const headerStyle = {
        margin: '0.5em 0',
        fontWeight: 500,
    }

    const { onChange, value } = input

    return (
        <Transfer
            options={options}
            selected={value}
            filterable
            enableOrderChange
            onChange={({ selected }) => onChange(selected)}
            leftHeader={<h4 style={headerStyle}>Available jobs</h4>}
            rightHeader={<h4 style={headerStyle}>Jobs in this sequence</h4>}
        />
    )
}

SequenceTransfer.propTypes = {
    input: shape({
        onChange: func.isRequired,
        value: array.isRequired,
    }).isRequired,
    options: arrayOf(object).isRequired,
}

// The key under which this field will be sent to the backend
const FIELD_NAME = 'sequence'
const VALIDATOR = composeValidators(hasValue)
const initialValue = []

// Form field for ordering jobs in a queue
const SequenceOrderField = () => {
    const { loading, error, data } = useQueueables()

    if (loading || error) {
        return 'loading or error'
    }

    const options = data.map(({ name, id }) => ({ label: name, value: id }))

    return (
        <Field
            name={FIELD_NAME}
            component={SequenceTransfer}
            options={options}
            initialValue={initialValue}
            label={i18n.t('Job sequence')}
            validate={VALIDATOR}
            required
        />
    )
}

export default SequenceOrderField
