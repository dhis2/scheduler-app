import React from 'react'
import { shape, string, object } from 'prop-types'
import { InputField, Help } from '@dhis2/ui-core'
import validateCron from '../../services/validate-cron'

export const validate = value => {
    const isString = typeof value === 'string'
    const isFilled = isString && value.length > 0

    if (!isFilled) {
        return new Error('Cron expression is required')
    }

    if (!validateCron(value)) {
        return new Error('Needs to be a valid CRON expression')
    }

    return undefined
}

const CronExpression = ({ input, meta, label }) => {
    const { touched, error } = meta
    const hasError = touched && !!error

    return (
        <div>
            <InputField {...input} label={label} error={hasError} required />
            {hasError && <Help error>{meta.error.message}</Help>}
        </div>
    )
}

CronExpression.propTypes = {
    label: string.isRequired,
    meta: shape({
        error: object,
    }).isRequired,
    input: shape({}).isRequired,
}

CronExpression.validate = validate

export default CronExpression
