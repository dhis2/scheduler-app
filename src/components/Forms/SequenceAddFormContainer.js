import React from 'react'
import PropTypes from 'prop-types'
import { ReactFinalForm } from '@dhis2/ui'
// import { useSubmitSequence } from '../../hooks/sequences'
import SequenceAddForm from './SequenceAddForm'

const { Form } = ReactFinalForm

const SequenceAddFormContainer = ({ setIsPristine }) => {
    // const [submitSequence] = useSubmitSequence()

    /**
     * destroyOnUnregister is enabled so that dynamic fields will be unregistered
     * when they're removed from the form, for instance when the jobType changes.
     */
    return (
        <Form
            onSubmit={() => {}}
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
