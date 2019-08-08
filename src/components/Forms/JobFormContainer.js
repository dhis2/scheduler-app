import React from 'react'
import { func } from 'prop-types'
import { FORM_ERROR } from 'final-form'
import { connect } from 'react-redux'
import { Form } from 'react-final-form'
import { actions } from '../../data/jobs'
import history from '../../services/history'
import { fieldNames, validators } from '../FormFields'
import JobForm from './JobForm'

/**
 * This validation function checks the entire form on submission. It receives an object with the
 * values for each field, with the keys corresponding to the name of the field. To not have these
 * field names all over the app I'm exporting them from the fields themselves.
 */

const validate = values => {
    const { JOB_NAME, JOB_TYPE, CRON } = fieldNames
    const {
        JOB_NAME_VALIDATOR,
        JOB_TYPE_VALIDATOR,
        CRON_VALIDATOR,
    } = validators

    const jobNameValue = values[JOB_NAME]
    const cronValue = values[CRON]
    const jobTypeValue = values[JOB_TYPE]

    return {
        [JOB_NAME]: JOB_NAME_VALIDATOR(jobNameValue),
        [CRON]: CRON_VALIDATOR(cronValue),
        [JOB_TYPE]: JOB_TYPE_VALIDATOR(jobTypeValue),
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
