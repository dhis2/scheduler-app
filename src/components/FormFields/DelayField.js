import React from 'react'
import {
    ReactFinalForm,
    InputFieldFF,
    composeValidators,
    hasValue,
    integer,
    createNumberRange,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { formatToString } from './formatters'

const { Field } = ReactFinalForm

// Omitting the underscore here since it messes up i18n
const lowerbound = 1
const upperbound = 86400

// The key under which this field will be sent to the backend
const FIELD_NAME = 'delay'
const VALIDATOR = composeValidators(
    integer,
    hasValue,
    createNumberRange(lowerbound, upperbound)
)

const DelayField = () => (
    <Field
        component={InputFieldFF}
        name={FIELD_NAME}
        validate={VALIDATOR}
        label={i18n.t('Delay')}
        type="number"
        format={formatToString}
        helpText={i18n.t(
            'Delay in seconds ({{ lowerbound }} - {{ upperbound }})',
            {
                lowerbound,
                upperbound,
            }
        )}
        required
    />
)

export default DelayField
