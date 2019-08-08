import React from 'react'
import { Field } from 'react-final-form'
import { Switch } from '../../components/FormBaseFields'

// The key under which this field will be sent to the backend
export const FIELD_NAME = 'continuousExecution'

const ContinuousExecutionField = () => (
    <Field
        name={FIELD_NAME}
        component={Switch}
        label="Continuous Execution"
        type="checkbox"
    />
)

export default ContinuousExecutionField
