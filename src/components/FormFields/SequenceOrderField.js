import PropTypes from 'prop-types'
import React from 'react'
import {
    ReactFinalForm,
    Transfer,
    composeValidators,
    hasValue,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'

const { Field } = ReactFinalForm
const { arrayOf, object } = PropTypes

// Customized transfer component used in the form field below
const SequenceTransfer = ({ options }) => {
    const headerStyle = {
        margin: '0.5em 0',
        fontWeight: 500,
    }

    return (
        <Transfer
            options={options}
            filterable
            enableOrderChange
            onChange={() => {}}
            leftHeader={<h4 style={headerStyle}>Available jobs</h4>}
            rightHeader={<h4 style={headerStyle}>Jobs in this sequence</h4>}
        />
    )
}

SequenceTransfer.propTypes = {
    options: arrayOf(object).isRequired,
}

// The key under which this field will be sent to the backend
const FIELD_NAME = 'sequence'
const VALIDATOR = composeValidators(hasValue)

// Form field for ordering jobs in a queue
const SequenceOrderField = () => (
    <Field
        name={FIELD_NAME}
        component={SequenceTransfer}
        options={[
            { label: 'one', value: 1 },
            { label: 'two', value: 2 },
        ]}
        label={i18n.t('Job sequence')}
        validate={VALIDATOR}
        required
    />
)

export default SequenceOrderField
