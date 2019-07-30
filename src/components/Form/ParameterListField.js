import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { arrayOf, object, func, bool, string } from 'prop-types'
import { Field } from 'react-final-form'
import { SelectField } from '@dhis2/ui-core'
import * as rootSelectors from '../../rootSelectors'
import { selectors as jobTypeSelectors } from '../../data/job-types'
import { actions, selectors } from '../../data/parameter-list'
import { InlineError } from '../Errors'

export const UnconnectedParameterListField = ({
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
                    {options.map(({ id, displayName }) => (
                        <option key={id} value={id}>
                            {displayName}
                        </option>
                    ))}
                </SelectField>
            )}
        />
    )
}

UnconnectedParameterListField.propTypes = {
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
)(UnconnectedParameterListField)
