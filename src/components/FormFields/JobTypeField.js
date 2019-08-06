import React from 'react'
import { connect } from 'react-redux'
import { arrayOf, string } from 'prop-types'
import { Field } from 'react-final-form'
import * as rootSelectors from '../../rootSelectors'
import { selectors } from '../../data/job-types'
import { SelectField } from '../FormBaseFields'
import { requiredString } from '../../services/validators'

// The key under which this field will be sent to the backend
const fieldName = 'jobType'

export const DumbJobTypeField = ({ jobTypes }) => (
    <Field
        name={fieldName}
        validate={requiredString}
        render={props => (
            <SelectField {...props} label="Job Type" required>
                {jobTypes.map(type => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </SelectField>
        )}
    />
)

DumbJobTypeField.fieldName = fieldName
DumbJobTypeField.validator = requiredString

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
