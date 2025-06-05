import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import {
    SingleSelectField,
    ReactFinalForm,
    SingleSelectFieldFF,
} from '@dhis2/ui'
import { testPolicies } from '../../../services/server-translations'

const { Field } = ReactFinalForm

const TestPolicyField = ({ label, name, constants }) => {
    if (constants.length === 0) {
        return (
            <SingleSelectField
                label={label}
                helpText={i18n.t('No options available')}
                disabled
            />
        )
    }

    const options = constants.map((option) => ({
        value: option,
        label: testPolicies[option] || option,
    }))

    return (
        <Field
            name={name}
            component={SingleSelectFieldFF}
            options={options}
            label={label}
        />
    )
}

const { string, arrayOf } = PropTypes

TestPolicyField.propTypes = {
    constants: arrayOf(string).isRequired,
    label: string.isRequired,
    name: string.isRequired,
}

export default TestPolicyField
