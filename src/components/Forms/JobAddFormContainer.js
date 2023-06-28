import React from 'react'
import PropTypes from 'prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import history from '../../services/history'
import { useSubmitJob } from '../../hooks/jobs'
import JobAddForm from './JobAddForm'

const { Form } = ReactFinalForm

const JobAddFormContainer = ({ setIsPristine }) => {
    const redirect = () => {
        history.push('/')
    }
    const [submitJob] = useSubmitJob({ onSuccess: redirect })

    /**
     * destroyOnUnregister is enabled so that dynamic fields will be unregistered
     * when they're removed from the form, for instance when the jobType changes.
     */
    return (
        <Form
            onSubmit={submitJob}
            component={JobAddForm}
            setIsPristine={setIsPristine}
            destroyOnUnregister
        />
    )
}

const { func } = PropTypes

JobAddFormContainer.propTypes = {
    setIsPristine: func.isRequired,
}

export default JobAddFormContainer
