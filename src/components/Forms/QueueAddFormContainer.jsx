import React from 'react'
import { ReactFinalForm } from '@dhis2/ui'
import history from '../../services/history'
import { useSubmitQueue } from '../../hooks/queues'
import QueueAddForm from './QueueAddForm'

const { Form } = ReactFinalForm

const navigateHome = () => {
    history.push('/')
}

const QueueAddFormContainer = () => {
    const [submitQueue] = useSubmitQueue({ onSuccess: navigateHome })

    return (
        <Form
            onSubmit={submitQueue}
            component={QueueAddForm}
            destroyOnUnregister
        />
    )
}

export default QueueAddFormContainer
