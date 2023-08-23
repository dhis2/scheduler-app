import React from 'react'
import { ReactFinalForm } from '@dhis2/ui'
import history from '../../services/history'
import { useSubmitQueue } from '../../hooks/queues'
import QueueAddForm from './QueueAddForm'

const { Form } = ReactFinalForm

const QueueAddFormContainer = () => {
    const redirect = () => {
        history.push('/')
    }
    const [submitQueue] = useSubmitQueue({ onSuccess: redirect })

    return (
        <Form
            onSubmit={submitQueue}
            component={QueueAddForm}
            destroyOnUnregister
        />
    )
}

export default QueueAddFormContainer
