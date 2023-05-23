import React from 'react'
import PropTypes from 'prop-types'
import { MultiSelectFieldFF, ReactFinalForm, MultiSelectField } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { useParameterOption } from '../../hooks/parameter-options'

const { Field } = ReactFinalForm

// A labeled options field has options that have both an id and a label.
const LabeledOptionsField = ({ label, name, parameterName }) => {
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

    const labeledOptions = data.map(({ id, displayName }) => ({
        value: id,
        label: displayName,
    }))

    return (
        <Field
            name={name}
            component={MultiSelectFieldFF}
            options={labeledOptions}
            label={label}
        />
    )
}

const { string } = PropTypes

LabeledOptionsField.propTypes = {
    label: string.isRequired,
    name: string.isRequired,
    parameterName: string.isRequired,
}

export default LabeledOptionsField
