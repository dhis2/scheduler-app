import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import { useParams } from 'react-router-dom'
import { useDataQuery } from '@dhis2/app-runtime'
import { useUpdateJob } from '../../hooks/jobs'
import JobEditForm from './JobEditForm'

const { Form } = ReactFinalForm

/**
 * The fields we need for the initialValues for our form fields. Since we use
 * these values to set the initial values in final-form, if we wouldn't filter
 * them we'd end up submitting way more data than we intend to.
 */

const whitelistedFields = [
    'cronExpression',
    'delay',
    'jobParameters',
    'jobType',
    'name',
    'schedulingType',
]

const query = {
    job: {
        resource: 'jobConfigurations',
        id: /* istanbul ignore next */ ({ id }) => id,
        params: {
            paging: false,
            fields: whitelistedFields.join(','),
        },
    },
}

const JobEditFormContainer = ({ setIsPristine }) => {
    const { id } = useParams()
    const { loading, error, data } = useDataQuery(query, { variables: { id } })
    const [updateJob] = useUpdateJob({ id })

    if (loading) {
        return null
    }

    /* istanbul ignore next: we're testing this section, but coverage reporting seems to disagree */
    if (error) {
        /**
         * We need the data, so throw the error if it
         * can't be loaded.
         */
        throw error
    }

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
            initialValues={data.job}
            id={id}
            destroyOnUnregister
        />
    )
}

const { func } = PropTypes

JobEditFormContainer.propTypes = {
    setIsPristine: func.isRequired,
}

export default JobEditFormContainer
