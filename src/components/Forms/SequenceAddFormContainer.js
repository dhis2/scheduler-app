import React from 'react'
import { ReactFinalForm } from '@dhis2/ui'
import history from '../../services/history'
import { useSubmitQueue } from '../../hooks/queues'
import SequenceAddForm from './SequenceAddForm'

const { Form } = ReactFinalForm

const SequenceAddFormContainer = () => {
    const redirect = () => {
        history.push('/')
    }
    const [submitQueue] = useSubmitQueue({ onSuccess: redirect })

    return (
        <Form
            onSubmit={submitQueue}
            component={SequenceAddForm}
            destroyOnUnregister
        />
    )
}

export default SequenceAddFormContainer
