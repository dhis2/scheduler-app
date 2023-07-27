import React from 'react'
import PropTypes from 'prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import { useParams } from 'react-router-dom'
import history from '../../services/history'
import { useUpdateJob } from '../../hooks/jobs'
import JobEditForm from './JobEditForm'

const { Form } = ReactFinalForm

/**
 * The fields we need for the initialValues for our form fields. Since we use
 * these values to set the initial values in final-form, if we wouldn't filter
 * them we'd end up submitting way more data than we intend to.
 */

const initialFields = [
    'cronExpression',
    'delay',
    'jobParameters',
    'jobType',
    'name',
]

const JobEditFormContainer = ({ job }) => {
    const { id } = useParams()
    const redirect = () => {
        history.push('/')
    }
    const [updateJob] = useUpdateJob({ id, onSuccess: redirect })

    // Creating an object with just the values we want to use as initial values
    const initialValues = initialFields.reduce((filtered, key) => {
        filtered[key] = job[key]
        return filtered
    }, {})

    return (
        <Form
            onSubmit={updateJob}
            component={JobEditForm}
            initialValues={initialValues}
            id={id}
            destroyOnUnregister
        />
    )
}

const { object } = PropTypes

JobEditFormContainer.propTypes = {
    job: object.isRequired,
}

export default JobEditFormContainer
