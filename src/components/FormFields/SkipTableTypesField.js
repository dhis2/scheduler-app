import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { MultiSelectField, ReactFinalForm, MultiSelectFieldFF } from '@dhis2/ui'
import { analyticsTableTypes } from '../../services/server-translations'
import { useParameterOption } from '../../hooks/parameter-options'

const { Field } = ReactFinalForm

const SkipTableTypesField = ({ label, name, parameterName }) => {
    const { loading, error, data } = useParameterOption(parameterName)
    const disabledProps = { disabled: true, label }

    if (loading) {
        return (
            <MultiSelectField
                {...disabledProps}
                helpText={i18n.t('Loading options')}
            />
        )
    }

    if (error) {
        return (
            <MultiSelectField
                {...disabledProps}
                helpText={i18n.t('Something went wrong whilst loading options')}
            />
        )
    }

    if (data.length === 0) {
        return (
            <MultiSelectField
                {...disabledProps}
                helpText={i18n.t('No options available')}
            />
        )
    }

    const translatedOptions = data.map((option) => ({
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
