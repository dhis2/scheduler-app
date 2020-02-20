import React from 'react'
import { connect } from 'react-redux'
import { arrayOf, string } from 'prop-types'
import { Field } from 'react-final-form'
import { SingleSelect } from '@dhis2/ui-forms'
import * as rootSelectors from '../../rootSelectors'
import { selectors } from '../../data/job-types'
import { requiredSingleSelectOption } from '../../services/validators'

// The key under which this field will be sent to the backend
export const FIELD_NAME = 'jobType'
export const VALIDATOR = requiredSingleSelectOption

export const DumbJobTypeField = ({ jobTypes }) => (
    <Field
        name={FIELD_NAME}
        validate={VALIDATOR}
        component={SingleSelect}
        options={jobTypes.map(type => ({ value: type, label: type }))}
    />
)

DumbJobTypeField.propTypes = {
    jobTypes: arrayOf(string).isRequired,
}

const mapStateToProps = state => {
    const jobTypes = rootSelectors.getJobTypes(state)

    return {
        jobTypes: selectors.getJobTypes(jobTypes),
    }
}

export default connect(mapStateToProps)(DumbJobTypeField)
