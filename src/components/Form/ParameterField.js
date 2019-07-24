import React from 'react'
import { connect } from 'react-redux'
import { object, string } from 'prop-types'
import { Field } from 'react-final-form'
import { InputField, Switch } from '../FormBase'
import * as rootSelectors from '../../rootSelectors'
import { selectors } from '../../data/job-types'

export const UnconnectedParameterField = ({ parameters }) => {
    return Object.keys(parameters).map(key => {
        const { name, type, label } = parameters[key]
        const defaultProps = {
            label,
            key: name,
            name: `parameters.${name}`,
        }

        switch (type) {
            case 'java.lang.String':
                return (
                    <Field
                        {...defaultProps}
                        component={InputField}
                        type="text"
                    />
                )
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
                    <Field
                        {...defaultProps}
                        component={InputField}
                        type="number"
                    />
                )
            case 'java.util.Set':
            case 'java.util.List':
                return (
                    <Field
                        {...defaultProps}
                        component={InputField}
                        type="text"
                    />
                )
            default:
                return null
        }
    })
}

UnconnectedParameterField.defaultProps = {
    jobType: '',
    parameters: {},
}

UnconnectedParameterField.propTypes = {
    jobType: string,
    parameters: object,
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

export default connect(mapStateToProps)(UnconnectedParameterField)
