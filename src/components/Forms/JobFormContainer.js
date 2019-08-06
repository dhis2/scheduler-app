import React from 'react'
import { func } from 'prop-types'
import { FORM_ERROR } from 'final-form'
import { connect } from 'react-redux'
import { Form } from 'react-final-form'
import { actions } from '../../data/jobs'
import history from '../../services/history'
import { JobNameField, CronField, JobTypeField } from '../FormFields'
import JobForm from './JobForm'

/**
 * This validation function checks the entire form on submission. It receives an object with the
 * values for each field, with the keys corresponding to the name of the field. To not have these
 * field names all over the app I'm exporting them from the fields themselves.
 */

const validate = values => {
    const jobNameValue = values[JobNameField.fieldName]
    const cronValue = values[CronField.fieldName]
    const jobTypeValue = values[JobTypeField.fieldName]

    return {
        [JobNameField.fieldName]: JobNameField.validator(jobNameValue),
        [CronField.fieldName]: CronField.validator(cronValue),
        [JobTypeField.fieldName]: JobTypeField.validator(jobTypeValue),
    }
}

const DumbJobFormContainer = ({ setIsPristine, createJob }) => {
    const onSubmit = job =>
        createJob(job)
            .then(() => history.push('/'))
            .catch(error => ({ [FORM_ERROR]: error }))

    return (
        <Form
            onSubmit={onSubmit}
            validate={validate}
            component={JobForm}
            setIsPristine={setIsPristine}
        />
    )
}

DumbJobFormContainer.propTypes = {
    setIsPristine: func.isRequired,
    createJob: func.isRequired,
}

const mapDispatchToProps = {
    createJob: actions.createJob,
}

export default connect(
    null,
    mapDispatchToProps
)(DumbJobFormContainer)
