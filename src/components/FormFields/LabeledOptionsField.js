import React from 'react'
import { string } from 'prop-types'
import { MultiSelectField } from '@dhis2/ui-core'
import { Field, MultiSelect } from '@dhis2/ui-forms'
import { useGetLabeledOptions } from '../../hooks/parameter-options'

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
        return <MultiSelectField error helpText={error.message} label={label} />
    }

    if (data.length === 0) {
        return (
            <MultiSelectField
                disabled
                helpText="No options available"
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
            component={MultiSelect}
            options={options}
            label={label}
        />
    )
}

LabeledOptionsField.propTypes = {
    endpoint: string.isRequired,
    label: string.isRequired,
    name: string.isRequired,
    parameterName: string.isRequired,
}

export default LabeledOptionsField
