import React from 'react'
import { shape, string, object, bool } from 'prop-types'
import { InputField, Help } from '@dhis2/ui-core'

const CronExpression = ({ input, meta, label }) => {
    const { touched, error } = meta
    const hasError = touched && !!error

    return (
        <React.Fragment>
            <InputField {...input} label={label} error={hasError} required />
            {hasError && <Help error>{meta.error.message}</Help>}
        </React.Fragment>
    )
}

CronExpression.propTypes = {
    label: string.isRequired,
    meta: shape({
        error: object,
        touched: bool.isRequired,
    }).isRequired,
    input: object.isRequired,
}

export default CronExpression
