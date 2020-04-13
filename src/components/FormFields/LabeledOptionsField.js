import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { MultiSelectFieldFF, ReactFinalForm, MultiSelectField } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { useGetLabeledOptions } from '../../hooks/parameter-options'

const { Field } = ReactFinalForm

/**
 * A labeled options field has options that have both a label and a value,
 * as opposed to the unlabeled options field, where the options just have
 * values.
 */

const LabeledOptionsField = ({ endpoint, label, name, parameterName }) => {
    const { loading, error, data } = useGetLabeledOptions({
        endpoint,
        parameterName,
    })

    if (loading) {
        return <MultiSelectField loading label={label} />
    }

    if (error) {
        /**
         * We need these values, so throw the error if they
         * can't be loaded.
         */
        throw error
    }

    if (data.length === 0) {
        return (
            <MultiSelectField
                disabled
                helpText={i18n.t('No options available')}
                label={label}
            />
        )
    }

    const options = data.map(({ id, displayName }) => ({
        value: id,
        label: displayName,
    }))

    return (
        <Field
            name={name}
            component={MultiSelectFieldFF}
            options={options}
            label={label}
        />
    )
}

const { string } = PropTypes

LabeledOptionsField.propTypes = {
    endpoint: string.isRequired,
    label: string.isRequired,
    name: string.isRequired,
    parameterName: string.isRequired,
}

export default LabeledOptionsField
