import React from 'react'
import {
    Field,
    Input,
    composeValidators,
    hasValue,
    integer,
    createNumberRange,
} from '@dhis2/ui-forms'

const LOWER_BOUND = 1
const UPPER_BOUND = 86400

// The key under which this field will be sent to the backend
export const FIELD_NAME = 'delay'
export const VALIDATOR = composeValidators(
    integer,
    hasValue,
    createNumberRange(LOWER_BOUND, UPPER_BOUND)
)

const DelayField = () => (
    <Field
        component={Input}
        name={FIELD_NAME}
        validate={VALIDATOR}
        label="Delay"
        type="number"
        helpText={`Delay in seconds (${LOWER_BOUND} - ${UPPER_BOUND})`}
        required
    />
)

export default DelayField
