import React, { useContext } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { MultiSelectFieldFF, ReactFinalForm, MultiSelectField } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { StoreContext, selectors } from '../Store'

const { Field } = ReactFinalForm

// A labeled options field has options that have both an id and a label.
const LabeledOptionsField = ({ label, name, parameterName }) => {
    const store = useContext(StoreContext)
    const options = selectors.getParameterOptions(store, parameterName)

    if (options.length === 0) {
        return (
            <MultiSelectField
                disabled
                helpText={i18n.t('No options available')}
                label={label}
            />
        )
    }

    const labeledOptions = options.map(({ id, displayName }) => ({
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
