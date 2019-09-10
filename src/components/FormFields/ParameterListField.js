import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { arrayOf, object, func, bool, string } from 'prop-types'
import { Field } from 'react-final-form'
import * as rootSelectors from '../../rootSelectors'
import { selectors as jobTypeSelectors } from '../../data/job-types'
import { actions, selectors } from '../../data/parameter-list'
import { InlineError } from '../Errors'

export const DumbParameterListField = ({
    didFetch,
    endpoint,
    errorMessage,
    fetchParameterListIfNeeded,
    jobType,
    label,
    name,
    options,
    parameterName,
}) => {
    useEffect(() => {
        fetchParameterListIfNeeded(endpoint, jobType, parameterName)
    }, [fetchParameterListIfNeeded, endpoint, jobType, parameterName])

    // Show loading state when options are loading
    if (!didFetch) {
        return (
            <label>
                <div>{label}</div>
                <select disabled>
                    <option>Loading...</option>
                </select>
            </label>
        )
    }

    if (errorMessage) {
        return <InlineError message={errorMessage} />
    }

    if (options.length === 0) {
        return (
            <label>
                <div>{label}</div>
                <select disabled>
                    <option>No available options</option>
                </select>
            </label>
        )
    }

    return (
        <label>
            <div>{label}</div>
            <Field name={name} component="select" type="select" multiple>
                {options.map(({ id, displayName }) => (
                    <option key={id} value={id}>
                        {displayName}
                    </option>
                ))}
            </Field>
        </label>
    )
}

DumbParameterListField.propTypes = {
    didFetch: bool.isRequired,
    endpoint: string.isRequired,
    errorMessage: string.isRequired,
    fetchParameterListIfNeeded: func.isRequired,
    jobType: string.isRequired,
    label: string.isRequired,
    name: string.isRequired,
    options: arrayOf(object).isRequired,
    parameterName: string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    const { jobType, parameterName } = ownProps
    const jobTypes = rootSelectors.getJobTypes(state)
    const parameterList = rootSelectors.getParameterList(state)

    return {
        endpoint: jobTypeSelectors.getParameterOptionEndpoint(
            jobTypes,
            jobType,
            parameterName
        ),
        didFetch: selectors.getDidFetch(parameterList, jobType, parameterName),
        errorMessage: selectors.getErrorMessage(
            parameterList,
            jobType,
            parameterName
        ),
        options: selectors.getParameterList(
            parameterList,
            jobType,
            parameterName
        ),
    }
}

const mapDispatchToProps = {
    fetchParameterListIfNeeded: actions.fetchParameterListIfNeeded,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DumbParameterListField)
