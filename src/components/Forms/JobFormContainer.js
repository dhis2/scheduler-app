import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { FinalForm, ReactFinalForm } from '@dhis2/ui'
import { useCreateJob } from '../../hooks/jobs'
import history from '../../services/history'
import { fieldNames, validators } from '../FormFields'
import JobForm from './JobForm'

const { FORM_ERROR } = FinalForm
const { Form } = ReactFinalForm

/**
 * This validation function checks the entire form on submission. It receives an object with the
 * values for each field, with the keys corresponding to the name of the field. To not have these
 * field names all over the app they're exported from the fields themselves.
 */

const formatValues = ({ job }) => {
    const { JOB_TYPE } = fieldNames
    const formatted = {
        ...job,
        [JOB_TYPE]: job[JOB_TYPE].value,
    }

    return { job: formatted }
}

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

const JobFormContainer = ({ setIsPristine }) => {
    const [createJob] = useCreateJob()

    const onSubmit = job =>
        createJob(formatValues({ job }))
            .then(() => history.push('/'))
            .catch(error => ({ [FORM_ERROR]: error.message }))

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

const { func } = PropTypes

JobFormContainer.propTypes = {
    setIsPristine: func.isRequired,
}

export default JobFormContainer
