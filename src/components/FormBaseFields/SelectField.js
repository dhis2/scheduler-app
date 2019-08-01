import React from 'react'
import { node, bool, shape, string, object } from 'prop-types'
import { SelectField as CoreSelect, Help } from '@dhis2/ui-core'

const SelectField = ({ input, meta, label, required, children }) => {
    const { touched, error } = meta
    const hasError = touched && !!error

    return (
        <React.Fragment>
            <CoreSelect
                {...input}
                label={label}
                error={hasError}
                required={required}
            >
                {children}
            </CoreSelect>
            {hasError && <Help error>{meta.error.message}</Help>}
        </React.Fragment>
    )
}

SelectField.defaultProps = {
    required: false,
}

SelectField.propTypes = {
    label: string.isRequired,
    meta: shape({
        error: object,
        touched: bool.isRequired,
    }).isRequired,
    input: object.isRequired,
    children: node.isRequired,
    required: bool,
}

export default SelectField
