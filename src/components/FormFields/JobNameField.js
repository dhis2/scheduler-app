import React from 'react'
import {
    Field,
    Input,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui-forms'
import i18n from '@dhis2/d2-i18n'

// The key under which this field will be sent to the backend
export const FIELD_NAME = 'name'
export const VALIDATOR = composeValidators(string, hasValue)

const JobNameField = () => (
    <Field
        name={FIELD_NAME}
        component={Input}
        validate={VALIDATOR}
        label={i18n.t('Name')}
        type="text"
        required
    />
)

export default JobNameField
