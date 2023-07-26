import React from 'react'
import PropTypes from 'prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import history from '../../services/history'
import { useUpdateJobQueue } from '../../hooks/job-queues'
import SequenceEditForm from './SequenceEditForm'

const { Form } = ReactFinalForm

/**
 * The fields we need for the initialValues for our form fields. Since we use
 * these values to set the initial values in final-form, if we wouldn't filter
 * them we'd end up submitting way more data than we intend to.
 */

const initialFields = ['cronExpression', 'sequence', 'name']

const SequenceEditFormContainer = ({ sequence }) => {
    const redirect = () => {
        history.push('/')
    }
    const [submitJobQueue] = useUpdateJobQueue({ onSuccess: redirect })

    // Creating an object with just the values we want to use as initial values
    const initialValues = initialFields.reduce((filtered, key) => {
        filtered[key] = sequence[key]
        return filtered
    }, {})

    initialValues.sequence = initialValues.sequence.map(({ id }) => id)

    /**
     * destroyOnUnregister is enabled so that dynamic fields will be unregistered
     * when they're removed from the form, for instance when the jobType changes.
     */
    return (
        <Form
            component={SequenceEditForm}
            destroyOnUnregister
            initialValues={initialValues}
            onSubmit={submitJobQueue}
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
