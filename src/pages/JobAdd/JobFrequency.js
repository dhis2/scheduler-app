import React from 'react'
import { shape, string, object } from 'prop-types'
import { SelectField, Help } from '@dhis2/ui-core'

export const validate = value => {
    const isString = typeof value === 'string'
    const isFilled = isString && value.length > 0

    if (!isFilled) {
        return new Error('Job frequency is required')
    }

    return undefined
}

const cronPresets = {
    'Every hour': '0 0 * ? * *',
    'Every day at midnight': '0 0 1 ? * *',
    'Every day at noon': '0 0 12 ? * MON-FRI',
    'Every week': '0 0 3 ? * MON',
}

const JobFrequency = ({ input, meta, label }) => {
    const { touched, error } = meta
    const hasError = touched && !!error

    return (
        <div>
            <SelectField {...input} label={label} error={hasError} required>
                {Object.keys(cronPresets).map(key => (
                    <option key={key} value={cronPresets[key]}>
                        {key}
                    </option>
                ))}
            </SelectField>
            {hasError && <Help error>{meta.error.message}</Help>}
        </div>
    )
}

JobFrequency.propTypes = {
    label: string.isRequired,
    meta: shape({
        error: object,
    }).isRequired,
    input: shape({}).isRequired,
}

JobFrequency.validate = validate

export default JobFrequency
