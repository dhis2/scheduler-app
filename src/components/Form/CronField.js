import React from 'react'
import { Field } from 'react-final-form'
import { InputField } from '../../components/FormBase'
import { requiredCronExpression } from './validators'

const CronField = () => (
    <Field
        name="cronExpression"
        component={InputField}
        validate={requiredCronExpression}
        label="CRON Expression"
        type="text"
        required
    />
)

export default CronField
