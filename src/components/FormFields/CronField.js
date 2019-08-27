import React from 'react'
import { bool } from 'prop-types'
import { Field } from 'react-final-form'
import { InputField } from '../../components/FormBaseFields'
import { requiredCron } from '../../services/validators'

// The key under which this field will be sent to the backend
export const FIELD_NAME = 'cronExpression'
export const VALIDATOR = requiredCron

const CronField = ({ disabled }) => (
    <Field
        component={InputField}
        name={FIELD_NAME}
        validate={VALIDATOR}
        label="CRON Expression"
        type="text"
        required={!disabled}
        disabled={disabled}
    />
)

CronField.defaultProps = {
    disabled: false,
}

CronField.propTypes = {
    disabled: bool,
}

export default CronField
