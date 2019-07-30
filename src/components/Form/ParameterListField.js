import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { arrayOf, func, bool, string } from 'prop-types'
import { Field } from 'react-final-form'
import { SelectField } from '@dhis2/ui-core'
import * as rootSelectors from '../../rootSelectors'
import { selectors as jobTypeSelectors } from '../../data/job-types'
import { actions, selectors } from '../../data/parameter-set'
import { InlineError } from '../Errors'

export const UnconnectedParameterSetField = ({
    didFetch,
    endpoint,
    errorMessage,
    fetchParameterSetIfNeeded,
    jobType,
    label,
    name,
    options,
    parameterName,
}) => {
    useEffect(() => {
        fetchParameterSetIfNeeded(endpoint, jobType, parameterName)
    }, [fetchParameterSetIfNeeded, endpoint, jobType, parameterName])

    // Show loading state when options are loading
    if (!didFetch) {
        return <SelectField label={label} loading />
    }

    if (errorMessage) {
        return <InlineError message={errorMessage} />
    }

    return (
        <Field
            name={name}
            render={({ input }) => (
                <SelectField {...input} label={label}>
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </SelectField>
            )}
        />
    )
}

UnconnectedParameterSetField.propTypes = {
    didFetch: bool.isRequired,
    endpoint: string.isRequired,
    errorMessage: string.isRequired,
    fetchParameterSetIfNeeded: func.isRequired,
    jobType: string.isRequired,
    label: string.isRequired,
    name: string.isRequired,
    options: arrayOf(string).isRequired,
    parameterName: string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    const { jobType, parameterName } = ownProps
    const jobTypes = rootSelectors.getJobTypes(state)
    const parameterSet = rootSelectors.getParameterSet(state)

    return {
        endpoint: jobTypeSelectors.getParameterOptionEndpoint(
            jobTypes,
            jobType,
            parameterName
        ),
        didFetch: selectors.getDidFetch(parameterSet, jobType, parameterName),
        errorMessage: selectors.getErrorMessage(
            parameterSet,
            jobType,
            parameterName
        ),
        options: selectors.getParameterSet(
            parameterSet,
            jobType,
            parameterName
        ),
    }
}

const mapDispatchToProps = {
    fetchParameterSetIfNeeded: actions.fetchParameterSetIfNeeded,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedParameterSetField)
