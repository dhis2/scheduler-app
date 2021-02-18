import React, { useContext } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import { useParams } from 'react-router-dom'
import { useUpdateJob } from '../../hooks/jobs'
import { StoreContext, selectors } from '../Store'
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
    'schedulingType',
]

const JobEditFormContainer = ({ setIsPristine }) => {
    const { id } = useParams()
    const [updateJob] = useUpdateJob({ id })
    const store = useContext(StoreContext)
    const refetchJobs = selectors.getRefetchJobs(store)
    const job = selectors.getJobById(store, id)

    // Creating an object with just the values we want to use as initial values
    const initialValues = initialFields.reduce((filtered, key) => {
        filtered[key] = job[key]
        return filtered
    }, {})

    /**
     * destroyOnUnregister is enabled so that dynamic fields will be unregistered
     * when they're removed from the form, for instance when the jobType changes.
     */
    /* istanbul ignore next: we're testing this section, but coverage reporting seems to disagree */
    return (
        <Form
            onSubmit={updateJob}
            component={JobEditForm}
            setIsPristine={setIsPristine}
            initialValues={initialValues}
            id={id}
            refetchJobs={refetchJobs}
            destroyOnUnregister
        />
    )
}

const { func } = PropTypes

JobEditFormContainer.propTypes = {
    setIsPristine: func.isRequired,
}

export default JobEditFormContainer
