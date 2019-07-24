import React from 'react'
import { Field } from 'react-final-form'
import { InputField } from '../../components/FormBase'
import { requiredString } from './validators'

const JobNameField = () => (
    <Field
        name="name"
        component={InputField}
        validate={requiredString}
        label="Name"
        type="text"
        required
    />
)

export default JobNameField
