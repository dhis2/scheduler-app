import React from 'react'
import { Field } from 'react-final-form'
import { InputField } from '../../components/FormBaseFields'
import { requiredCron } from '../../services/validators'

// The key under which this field will be sent to the backend
export const FIELD_NAME = 'cronExpression'
export const VALIDATOR = requiredCron

const CronField = () => (
    <Field
        name={FIELD_NAME}
        component={InputField}
        validate={VALIDATOR}
        label="CRON Expression"
        type="text"
        required
    />
)

export default CronField
