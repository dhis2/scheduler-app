import React from 'react'
import { string } from 'prop-types'
import { Field, Input, Switch } from '@dhis2/ui-forms'
import { useGetJobTypes, selectors } from '../../hooks/job-types'
import UnlabeledOptionsField from './UnlabeledOptionsField'
import LabeledOptionsField from './LabeledOptionsField'

// The key under which the parameters will be sent to the backend
const FIELD_NAME = 'jobParameters'

/**
 * Renders all parameters for a given jobtype
 */

const ParameterFields = ({ jobType }) => {
    const { loading, error, data } = useGetJobTypes()

    if (loading) {
        return <span>Loading</span>
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
                return <Field {...defaultProps} component={Input} type="text" />
            case 'java.lang.Boolean':
                return (
                    <Field
                        {...defaultProps}
                        component={Switch}
                        type="checkbox"
                    />
                )
            case 'java.lang.Integer':
                return (
                    <Field {...defaultProps} component={Input} type="number" />
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

ParameterFields.propTypes = {
    jobType: string.isRequired,
}

export default ParameterFields
