import React from 'react'
import PropTypes from 'prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import history from '../../services/history'
import { useUpdateQueue } from '../../hooks/queues'
import SequenceEditForm from './SequenceEditForm'

const { Form } = ReactFinalForm

const SequenceEditFormContainer = ({ sequence }) => {
    const redirect = () => {
        history.push('/')
    }

    // Create an object with only the values we want to use as initial values
    const { cronExpression, name } = sequence
    const initialValues = {
        cronExpression,
        sequence: sequence.sequence.map(({ id }) => id),
        name,
    }

    const [submitQueue] = useUpdateQueue({
        onSuccess: redirect,
        initialName: initialValues.name,
    })

    return (
        <Form
            name={sequence.name}
            component={SequenceEditForm}
            destroyOnUnregister
            initialValues={initialValues}
            onSubmit={submitQueue}
            initialSelectedValues={sequence?.sequence}
        />
    )
}

const { shape, string, array } = PropTypes

SequenceEditFormContainer.propTypes = {
    sequence: shape({
        cronExpression: string.isRequired,
        sequence: array.isRequired,
        name: string.isRequired,
    }).isRequired,
}

export default SequenceEditFormContainer
