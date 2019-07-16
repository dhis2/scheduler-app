import React from 'react'
import { connect } from 'react-redux'
import { arrayOf, bool, shape, string, object } from 'prop-types'
import { SelectField, Help } from '@dhis2/ui-core'
import * as rootSelectors from '../../rootSelectors'
import { selectors } from '../../data/job-types'

export const UnconnectedJobType = ({ input, meta, label, jobTypes }) => {
    const { touched, error } = meta
    const hasError = touched && !!error

    return (
        <React.Fragment>
            <SelectField {...input} label={label} error={hasError} required>
                {jobTypes.map(type => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </SelectField>
            {hasError && <Help error>{meta.error.message}</Help>}
        </React.Fragment>
    )
}

UnconnectedJobType.propTypes = {
    label: string.isRequired,
    meta: shape({
        error: object,
        touched: bool.isRequired,
    }).isRequired,
    input: object.isRequired,
    jobTypes: arrayOf(string).isRequired,
}

const mapStateToProps = state => {
    const jobTypes = rootSelectors.getJobTypes(state)

    return {
        jobTypes: selectors.getJobTypes(jobTypes),
    }
}

export default connect(mapStateToProps)(UnconnectedJobType)
