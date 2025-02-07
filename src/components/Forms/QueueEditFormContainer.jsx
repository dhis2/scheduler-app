import React from 'react'
import PropTypes from 'prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import history from '../../services/history'
import { useUpdateQueue } from '../../hooks/queues'
import QueueEditForm from './QueueEditForm'

const { Form } = ReactFinalForm

const navigateHome = () => {
    history.push('/')
}

const QueueEditFormContainer = ({ queue, jobs }) => {
    const [submitQueue] = useUpdateQueue({
        onSuccess: navigateHome,
        initialName: queue.name,
    })

    /**
     * The transfer needs the selected options to be supplied as well, but the backend
     * omits selected options from the queueables fetch. So we recreate them here.
     */
    const findJob = (targetId) => jobs.find(({ id }) => id === targetId)
    const initialSelectedValues = queue.sequence.map((currentId) => {
        const { name, id, jobType: type } = findJob(currentId)
        return { name, id, type }
    })

    return (
        <Form
            name={queue.name}
            component={QueueEditForm}
            destroyOnUnregister
            initialValues={queue}
            onSubmit={submitQueue}
            initialSelectedValues={initialSelectedValues}
        />
    )
}

const { arrayOf, shape, string, array } = PropTypes

QueueEditFormContainer.propTypes = {
    jobs: arrayOf(
        shape({
            id: string.isRequired,
            jobType: string.isRequired,
            name: string.isRequired,
        })
    ).isRequired,
    queue: shape({
        cronExpression: string.isRequired,
        sequence: array.isRequired,
        name: string.isRequired,
    }).isRequired,
}

export default QueueEditFormContainer
