import React from 'react'
import { bool, shape, string, object } from 'prop-types'
import { InputField as CoreInput, Help } from '@dhis2/ui-core'

const InputField = ({ input, meta, label, required }) => {
    const { touched, error } = meta
    const hasError = touched && !!error

    return (
        <React.Fragment>
            <CoreInput
                {...input}
                label={label}
                error={hasError}
                required={required}
            />
            {hasError && <Help error>{meta.error.message}</Help>}
        </React.Fragment>
    )
}

InputField.defaultProps = {
    required: false,
}

InputField.propTypes = {
    label: string.isRequired,
    meta: shape({
        error: object,
        touched: bool.isRequired,
    }).isRequired,
    input: object.isRequired,
    required: bool,
}

export default InputField
