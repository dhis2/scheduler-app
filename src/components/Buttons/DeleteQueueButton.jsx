import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { DeleteQueueModal } from '../Modal'

const DeleteQueueButton = ({ name, onSuccess }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <React.Fragment>
            <Button destructive onClick={() => setShowModal(true)}>
                {i18n.t('Delete queue')}
            </Button>
            {showModal && (
                <DeleteQueueModal
                    name={name}
                    hideModal={() => setShowModal(false)}
                    onSuccess={onSuccess}
                />
            )}
        </React.Fragment>
    )
}

const { string, func } = PropTypes

DeleteQueueButton.propTypes = {
    name: string.isRequired,
    onSuccess: func.isRequired,
}

export default DeleteQueueButton
