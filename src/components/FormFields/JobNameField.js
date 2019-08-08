import React from 'react'
import { Field } from 'react-final-form'
import { InputField } from '../../components/FormBaseFields'
import { requiredString } from '../../services/validators'

// The key under which this field will be sent to the backend
export const FIELD_NAME = 'name'
export const VALIDATOR = requiredString

const JobNameField = () => (
    <Field
        name={FIELD_NAME}
        component={InputField}
        validate={VALIDATOR}
        label="Name"
        type="text"
        required
    />
)

export default JobNameField
