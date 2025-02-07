import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MenuItem } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { DeleteJobModal } from '../Modal'

const DeleteJobAction = ({ id, onSuccess }) => {
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
                <DeleteJobModal
                    id={id}
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

DeleteJobAction.propTypes = {
    id: string.isRequired,
    onSuccess: func.isRequired,
}

export default DeleteJobAction
