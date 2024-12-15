import React from 'react'
import PropTypes from 'prop-types'
import {
    SingleSelectFieldFF,
    ReactFinalForm,
    SingleSelectField,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { useParameterOption } from '../../hooks/parameter-options'

const { Field } = ReactFinalForm

// This field has options that have both an id and a label.
const ListFieldSingle = ({ label, name, parameterName }) => {
    const { loading, error, data } = useParameterOption(parameterName)
    const disabledProps = { disabled: true, label }

    if (loading) {
        return (
            <SingleSelectField
                {...disabledProps}
                helpText={i18n.t('Loading options')}
            />
        )
    }

    if (error) {
        return (
            <SingleSelectField
                {...disabledProps}
                helpText={i18n.t('Something went wrong whilst loading options')}
            />
        )
    }

    if (data.length === 0) {
        return (
            <SingleSelectField
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
            component={SingleSelectFieldFF}
            options={labeledOptions}
            label={label}
        />
    )
}

const { string } = PropTypes

ListFieldSingle.propTypes = {
    label: string.isRequired,
    name: string.isRequired,
    parameterName: string.isRequired,
}

export default ListFieldSingle
