import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { MultiSelectField, ReactFinalForm, MultiSelectFieldFF } from '@dhis2/ui'
import { hooks } from '../Store'
import { analyticsTableTypes } from '../../services/server-translations'

const { Field } = ReactFinalForm

const SkipTableTypesField = ({ label, name, parameterName }) => {
    const options = hooks.useParameterOptions(parameterName)

    if (options.length === 0) {
        return (
            <MultiSelectField
                disabled
                helpText={i18n.t('No options available')}
                label={label}
            />
        )
    }

    const translatedOptions = options.map((option) => ({
        value: option,
        label: analyticsTableTypes[option] || option,
    }))

    return (
        <Field
            name={name}
            component={MultiSelectFieldFF}
            options={translatedOptions}
            label={label}
        />
    )
}

const { string } = PropTypes

SkipTableTypesField.propTypes = {
    label: string.isRequired,
    name: string.isRequired,
    parameterName: string.isRequired,
}

export default SkipTableTypesField
