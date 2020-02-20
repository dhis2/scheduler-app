import React from 'react'
import { connect } from 'react-redux'
import { arrayOf, object, string } from 'prop-types'
import { Field } from 'react-final-form'
import { Input, Switch } from '@dhis2/ui-forms'
import * as rootSelectors from '../../rootSelectors'
import { selectors } from '../../data/job-types'
import ParameterSetField from './ParameterSetField'
import ParameterListField from './ParameterListField'

export const DumbParameterCollectionField = ({ parameters, jobType }) => {
    if (!jobType) {
        return null
    }

    return parameters.map(({ name, type, label, parameterName, jobType }) => {
        const defaultProps = {
            label,
            key: name,
            name: `jobParameters.${name}`,
        }

        switch (type) {
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
                    <ParameterSetField
                        {...defaultProps}
                        parameterName={parameterName}
                        jobType={jobType}
                    />
                )
            case 'java.util.List':
                return (
                    <ParameterListField
                        {...defaultProps}
                        parameterName={parameterName}
                        jobType={jobType}
                    />
                )
            default:
                throw new Error('Unrecognised type')
        }
    })
}

DumbParameterCollectionField.defaultProps = {
    jobType: '',
    parameters: [],
}

DumbParameterCollectionField.propTypes = {
    jobType: string,
    parameters: arrayOf(object),
}

const mapStateToProps = (state, { jobType }) => {
    if (!jobType) {
        return {}
    }

    const jobTypes = rootSelectors.getJobTypes(state)

    return {
        parameters: selectors.getJobTypeParameters(jobTypes, jobType),
    }
}

export default connect(mapStateToProps)(DumbParameterCollectionField)
