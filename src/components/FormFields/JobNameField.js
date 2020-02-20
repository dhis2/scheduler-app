import React from 'react'
import { Field } from 'react-final-form'
import { Input, composeValidators, hasValue, string } from '@dhis2/ui-forms'

// The key under which this field will be sent to the backend
export const FIELD_NAME = 'name'
export const VALIDATOR = composeValidators(string, hasValue)

const JobNameField = () => (
    <Field
        name={FIELD_NAME}
        component={Input}
        validate={VALIDATOR}
        label="Name"
        type="text"
        required
    />
)

export default JobNameField
