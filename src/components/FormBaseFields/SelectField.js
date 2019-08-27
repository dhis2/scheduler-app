import React from 'react'
import { node, bool, shape, object } from 'prop-types'
import { SelectField as CoreSelect, Help } from '@dhis2/ui-core'

const SelectField = ({ input, meta, children, ...rest }) => {
    const { touched, error } = meta
    const hasError = touched && !!error

    return (
        <React.Fragment>
            <CoreSelect {...input} {...rest} error={hasError}>
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
    meta: shape({
        error: object,
        touched: bool.isRequired,
    }).isRequired,
    input: object.isRequired,
    children: node.isRequired,
}

export default SelectField
