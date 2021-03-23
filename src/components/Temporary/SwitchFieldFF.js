import PropTypes from 'prop-types'
import React from 'react'
import {
    createToggleChangeHandler,
    createFocusHandler,
    createBlurHandler,
    hasError,
    isValid,
    getValidationText,
} from './shared/helpers'
import { metaPropType, inputPropType } from './shared/propTypes'
import SwitchField from './SwitchField'

const SwitchFieldFF = ({
    error,
    input,
    meta,
    showValidStatus,
    valid,
    validationText,
    onBlur,
    onFocus,
    ...rest
}) => (
    <SwitchField
        {...rest}
        checked={input.checked}
        name={input.name}
        value={input.value}
        error={hasError(meta, error)}
        valid={isValid(meta, valid, showValidStatus)}
        validationText={getValidationText(meta, validationText, error)}
        onFocus={createFocusHandler(input, onFocus)}
        onChange={createToggleChangeHandler(input)}
        onBlur={createBlurHandler(input, onBlur)}
    />
)

SwitchFieldFF.propTypes = {
    input: inputPropType.isRequired,
    meta: metaPropType.isRequired,
    error: PropTypes.bool,
    showValidStatus: PropTypes.bool,
    valid: PropTypes.bool,
    validationText: PropTypes.string,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
}

export default SwitchFieldFF
