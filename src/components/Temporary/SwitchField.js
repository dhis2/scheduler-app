import { sharedPropTypes } from '@dhis2/ui-constants'
import { Field } from '@dhis2/ui-core'
import PropTypes from 'prop-types'
import React from 'react'
import Required from './Required'
import Switch from './Switch'

const AddRequired = ({ label, required, dataTest }) => (
    <React.Fragment>
        {label}
        {required && <Required dataTest={`${dataTest}-required`} />}
    </React.Fragment>
)
AddRequired.propTypes = {
    dataTest: PropTypes.string,
    label: PropTypes.node,
    required: PropTypes.bool,
}

const SwitchField = ({
    value,
    label,
    name,
    className,
    tabIndex,
    onChange,
    onFocus,
    onBlur,
    checked,
    disabled,
    valid,
    warning,
    error,
    dense,
    initialFocus,
    required,
    helpText,
    validationText,
    dataTest,
}) => (
    <Field
        className={className}
        dataTest={dataTest}
        helpText={helpText}
        validationText={validationText}
        error={error}
        warning={warning}
        valid={valid}
        required={required}
        name={name}
        disabled={disabled}
    >
        <Switch
            value={value}
            label={
                <AddRequired
                    label={label}
                    required={required}
                    dataTest={dataTest}
                />
            }
            name={name}
            tabIndex={tabIndex}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            checked={checked}
            disabled={disabled}
            valid={valid}
            warning={warning}
            error={error}
            dense={dense}
            initialFocus={initialFocus}
        />
    </Field>
)

SwitchField.defaultProps = {
    dataTest: 'dhis2-uiwidgets-switchfield',
}

SwitchField.propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    dataTest: PropTypes.string,
    dense: PropTypes.bool,
    disabled: PropTypes.bool,
    error: sharedPropTypes.statusPropType,
    helpText: PropTypes.string,
    initialFocus: PropTypes.bool,
    label: PropTypes.node,
    name: PropTypes.string,
    required: PropTypes.bool,
    tabIndex: PropTypes.string,
    valid: sharedPropTypes.statusPropType,
    validationText: PropTypes.string,
    value: PropTypes.string,
    warning: sharedPropTypes.statusPropType,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
}

export default SwitchField
