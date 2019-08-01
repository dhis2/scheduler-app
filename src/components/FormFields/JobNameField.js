import React from 'react'
import { Field } from 'react-final-form'
import { InputField } from '../../components/FormBaseFields'
import { requiredString } from '../../services/validators'

// The key under which this field will be sent to the backend
const fieldName = 'name'

const JobNameField = () => (
    <Field
        name={fieldName}
        component={InputField}
        validate={requiredString}
        label="Name"
        type="text"
        required
    />
)

JobNameField.fieldName = fieldName
JobNameField.validator = requiredString

export default JobNameField
