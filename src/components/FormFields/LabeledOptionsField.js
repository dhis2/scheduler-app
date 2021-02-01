import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { MultiSelectFieldFF, ReactFinalForm, MultiSelectField } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { useDataQuery } from '@dhis2/app-runtime'

const { Field } = ReactFinalForm

const query = {
    options: {
        resource: '/',
        id: /* istanbul ignore next */ ({ id }) => id,
        params: {
            paging: false,
        },
    },
}

/**
 * A labeled options field has options that have both a label and a value,
 * as opposed to the unlabeled options field, where the options just have
 * values.
 */

const LabeledOptionsField = ({ endpoint, label, name, parameterName }) => {
    /**
     * HACK: this is a bit of a hack to allow using the useDataQuery hook with
     * a dynamic query. Initially we used a custom hook for this but that
     * replicated all of the internal logic of the useDataQuery hook so this
     * seems like a better trade-off.
     */
    const { loading, error, data } = useDataQuery(query, {
        variables: { id: endpoint },
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

    if (
        !(parameterName in data.options) ||
        data.options[parameterName].length === 0
    ) {
        return (
            <MultiSelectField
                disabled
                helpText={i18n.t('No options available')}
                label={label}
            />
        )
    }

    const options = data.options[parameterName].map(({ id, displayName }) => ({
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