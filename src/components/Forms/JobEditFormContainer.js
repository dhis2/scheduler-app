import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import { useParams } from 'react-router-dom'
import { useDataQuery } from '@dhis2/app-runtime'
import { useSubmitJob } from '../../hooks/jobs'
import JobEditForm from './JobEditForm'

const { Form } = ReactFinalForm

const query = {
    job: {
        resource: 'jobConfigurations',
        id: ({ id }) => id,
        params: {
            paging: false,
        },
    },
}

const JobEditFormContainer = ({ setIsPristine }) => {
    const { id } = useParams()
    const { loading, error, data } = useDataQuery(query, { variables: { id } })
    const [submitJob] = useSubmitJob()

    if (loading) {
        return 'Loading'
    }

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
    return (
        <Form
            onSubmit={submitJob}
            component={JobEditForm}
            setIsPristine={setIsPristine}
            initialValues={data.job}
            destroyOnUnregister
        />
    )
}

const { func } = PropTypes

JobEditFormContainer.propTypes = {
    setIsPristine: func.isRequired,
}

export default JobEditFormContainer
