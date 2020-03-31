import React from 'react'
import { string } from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { MultiSelectField } from '@dhis2/ui-core'
import { Field, MultiSelect } from '@dhis2/ui-forms'
import { useGetUnlabeledOptions } from '../../hooks/parameter-options'

/**
 * An unlabeled options field has options that are just values, as opposed
 * to the labeled options field, where the options have labels as well as
 * values.
 */

const UnlabeledOptionsField = ({ endpoint, label, name }) => {
    const { loading, error, data } = useGetUnlabeledOptions({
        endpoint,
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
                helpText={i18n.t('No options available')}
                label={label}
            />
        )
    }

    const options = data.map(option => ({
        value: option,
        label: option,
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

UnlabeledOptionsField.propTypes = {
    endpoint: string.isRequired,
    label: string.isRequired,
    name: string.isRequired,
}

export default UnlabeledOptionsField
