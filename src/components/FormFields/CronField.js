import React from 'react'
import { Field } from 'react-final-form'
import { InputField } from '../../components/FormBaseFields'
import { requiredCron } from '../../services/validators'

// The key under which this field will be sent to the backend
const fieldName = 'cronExpression'

const CronField = () => (
    <Field
        name={fieldName}
        component={InputField}
        validate={requiredCron}
        label="CRON Expression"
        type="text"
        required
    />
)

CronField.fieldName = fieldName
CronField.validator = requiredCron

export default CronField
