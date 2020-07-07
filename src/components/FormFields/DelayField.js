import React from 'react'
import {
    ReactFinalForm,
    InputFieldFF,
    composeValidators,
    hasValue,
    integer,
    createNumberRange,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'

const { Field } = ReactFinalForm

/**
 * Our backend returns the delay as a number, but our inputs expect
 * and return a string, so we're formatting it to a string.
 */
const formatToString = value => {
    if (typeof value === 'number') {
        return value.toString()
    }

    return value
}

// Omitting the underscore here since it messes up i18n
const LOWERBOUND = 1
const UPPERBOUND = 86400

// The key under which this field will be sent to the backend
const FIELD_NAME = 'delay'
const VALIDATOR = composeValidators(
    integer,
    hasValue,
    createNumberRange(LOWERBOUND, UPPERBOUND)
)

const DelayField = () => (
    <Field
        component={InputFieldFF}
        name={FIELD_NAME}
        validate={VALIDATOR}
        label={i18n.t('Delay')}
        type="number"
        format={formatToString}
        helpText={i18n.t(
            'Delay in seconds ({{ LOWERBOUND }} - {{ UPPERBOUND }})',
            {
                LOWERBOUND,
                UPPERBOUND,
            }
        )}
        required
    />
)

export default DelayField
