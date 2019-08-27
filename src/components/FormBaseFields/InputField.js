import React from 'react'
import { bool, shape, object } from 'prop-types'
import { InputField as CoreInput, Help } from '@dhis2/ui-core'

const InputField = ({ input, meta, ...rest }) => {
    const { touched, error } = meta
    const { disabled } = rest
    const hasError = touched && !disabled && !!error

    return (
        <React.Fragment>
            <CoreInput {...input} {...rest} error={hasError} />
            {hasError && <Help error>{meta.error.message}</Help>}
        </React.Fragment>
    )
}

InputField.propTypes = {
    meta: shape({
        error: object,
        touched: bool.isRequired,
    }).isRequired,
    input: object.isRequired,
}

export default InputField
