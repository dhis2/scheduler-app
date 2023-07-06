import React from 'react'
import PropTypes from 'prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import history from '../../services/history'
import { useSubmitJobQueue } from '../../hooks/job-queues'
import SequenceAddForm from './SequenceAddForm'

const { Form } = ReactFinalForm

const SequenceAddFormContainer = ({ setIsPristine }) => {
    const redirect = () => {
        history.push('/')
    }
    const [submitJobQueue] = useSubmitJobQueue({ onSuccess: redirect })

    /**
     * destroyOnUnregister is enabled so that dynamic fields will be unregistered
     * when they're removed from the form, for instance when the jobType changes.
     */
    return (
        <Form
            onSubmit={submitJobQueue}
            component={SequenceAddForm}
            setIsPristine={setIsPristine}
            destroyOnUnregister
        />
    )
}

const { func } = PropTypes

SequenceAddFormContainer.propTypes = {
    setIsPristine: func.isRequired,
}

export default SequenceAddFormContainer
