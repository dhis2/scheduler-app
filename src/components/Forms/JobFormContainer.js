import React from 'react'
import { func } from 'prop-types'
import { FORM_ERROR } from 'final-form'
import { connect } from 'react-redux'
import { Form } from '@dhis2/ui-forms'
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

    const jobName = values[JOB_NAME]
    const cronExpression = values[CRON]
    const jobType = values[JOB_TYPE]

    const validation = {
        [JOB_NAME]: JOB_NAME_VALIDATOR(jobName),
        [CRON]: CRON_VALIDATOR(cronExpression),
        [JOB_TYPE]: JOB_TYPE_VALIDATOR(jobType),
    }

    return validation
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
            destroyOnUnregister
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
