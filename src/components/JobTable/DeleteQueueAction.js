import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MenuItem } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { DeleteQueueModal } from '../Modal'

const DeleteQueueAction = ({ name, onSuccess }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <React.Fragment>
            <MenuItem
                dense
                destructive
                onClick={() => {
                    setShowModal(true)
                }}
                label={i18n.t('Delete')}
            />
            {showModal && (
                <DeleteQueueModal
                    name={name}
                    hideModal={
                        /* istanbul ignore next */
                        () => setShowModal(false)
                    }
                    onSuccess={onSuccess}
                />
            )}
        </React.Fragment>
    )
}

const { string, func } = PropTypes

DeleteQueueAction.propTypes = {
    name: string.isRequired,
    onSuccess: func.isRequired,
}

export default DeleteQueueAction
