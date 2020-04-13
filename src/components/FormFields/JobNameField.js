import React from 'react'
import {
    ReactFinalForm,
    InputFieldFF,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'

const { Field } = ReactFinalForm

// The key under which this field will be sent to the backend
const FIELD_NAME = 'name'
const VALIDATOR = composeValidators(string, hasValue)

const JobNameField = () => (
    <Field
        name={FIELD_NAME}
        component={InputFieldFF}
        validate={VALIDATOR}
        label={i18n.t('Name')}
        type="text"
        required
    />
)

export default JobNameField
