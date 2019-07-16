import React from 'react'
import { shape, string, object } from 'prop-types'
import { InputField, Help } from '@dhis2/ui-core'

export const validate = value => {
    const isString = typeof value === 'string'
    const isFilled = isString && value.length > 0

    if (!isFilled) {
        return new Error('Job name is required')
    }

    return undefined
}

const JobName = ({ input, meta, label }) => {
    const { touched, error } = meta
    const hasError = touched && !!error

    return (
        <div>
            <InputField {...input} label={label} error={hasError} required />
            {hasError && <Help error>{meta.error.message}</Help>}
        </div>
    )
}

JobName.propTypes = {
    label: string.isRequired,
    meta: shape({
        error: object,
    }).isRequired,
    input: shape({}).isRequired,
}

JobName.validate = validate

export default JobName
