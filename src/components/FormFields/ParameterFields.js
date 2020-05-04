import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm, InputFieldFF, SwitchFieldFF } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { useGetJobTypes, selectors } from '../../hooks/job-types'
import UnlabeledOptionsField from './UnlabeledOptionsField'
import LabeledOptionsField from './LabeledOptionsField'

const { Field } = ReactFinalForm

// The key under which the parameters will be sent to the backend
const FIELD_NAME = 'jobParameters'

/**
 * Renders all parameters for a given jobtype
 */

const ParameterFields = ({ jobType }) => {
    const { loading, error, data } = useGetJobTypes()

    if (loading) {
        return <span>{i18n.t('Loading')}</span>
    }

    if (error) {
        return <span>{error.message}</span>
    }

    const parameters = selectors.getJobTypeParameters(data, jobType)

    return parameters.map(({ fieldName, name, klass, relativeApiEndpoint }) => {
        const defaultProps = {
            label: fieldName,
            key: name,
            name: `${FIELD_NAME}.${name}`,
        }
        const endpoint = selectors.getParameterEndpoint(relativeApiEndpoint)

        switch (klass) {
            case 'java.lang.String':
                return (
                    <Field
                        {...defaultProps}
                        component={InputFieldFF}
                        type="text"
                    />
                )
            case 'java.lang.Boolean':
                return (
                    <Field
                        {...defaultProps}
                        component={SwitchFieldFF}
                        type="checkbox"
                    />
                )
            case 'java.lang.Integer':
                return (
                    <Field
                        {...defaultProps}
                        component={InputFieldFF}
                        type="number"
                    />
                )
            case 'java.util.Set':
                return (
                    <UnlabeledOptionsField
                        {...defaultProps}
                        endpoint={endpoint}
                    />
                )
            case 'java.util.List':
                return (
                    <LabeledOptionsField
                        {...defaultProps}
                        parameterName={name}
                        endpoint={endpoint}
                    />
                )
            default:
                return null
        }
    })
}

const { string } = PropTypes

ParameterFields.propTypes = {
    jobType: string.isRequired,
}

export default ParameterFields
