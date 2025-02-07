import React from 'react'
import { ReactFinalForm } from '@dhis2/ui'
import history from '../../services/history'
import { useSubmitJob } from '../../hooks/jobs'
import JobAddForm from './JobAddForm'

const { Form } = ReactFinalForm

const JobAddFormContainer = () => {
    const redirect = () => {
        history.push('/')
    }
    const [submitJob] = useSubmitJob({ onSuccess: redirect })

    return (
        <Form onSubmit={submitJob} component={JobAddForm} destroyOnUnregister />
    )
}

export default JobAddFormContainer
