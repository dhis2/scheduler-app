import React from 'react'
import {
    Field,
    Input,
    composeValidators,
    hasValue,
    integer,
    createNumberRange,
} from '@dhis2/ui-forms'
import i18n from '@dhis2/d2-i18n'

const lowerBound = 1
const upperBound = 86400

// The key under which this field will be sent to the backend
const FIELD_NAME = 'delay'
const VALIDATOR = composeValidators(
    integer,
    hasValue,
    createNumberRange(lowerBound, upperBound)
)

const DelayField = () => (
    <Field
        component={Input}
        name={FIELD_NAME}
        validate={VALIDATOR}
        label={i18n.t('Delay')}
        type="number"
        helpText={i18n.t(
            'Delay in seconds ({{ lowerBound }} - {{ upperBound }})',
            {
                lowerBound,
                upperBound,
            }
        )}
        required
    />
)

export default DelayField
