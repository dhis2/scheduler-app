import React from 'react'
import { ReactFinalForm } from '@dhis2/ui'
import history from '../../services/history'
import { useSubmitJobQueue } from '../../hooks/job-queues'
import SequenceAddForm from './SequenceAddForm'

const { Form } = ReactFinalForm

const SequenceAddFormContainer = () => {
    const redirect = () => {
        history.push('/')
    }
    const [submitJobQueue] = useSubmitJobQueue({ onSuccess: redirect })

    return (
        <Form
            onSubmit={submitJobQueue}
            component={SequenceAddForm}
            destroyOnUnregister
        />
    )
}

export default SequenceAddFormContainer
