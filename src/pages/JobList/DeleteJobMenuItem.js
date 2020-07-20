import React, { useState } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { MenuItem } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { DeleteJobModal } from '../../components/Modal'

const DeleteJobMenuItem = ({ id }) => {
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
                />
            )}
        </React.Fragment>
    )
}

const { string } = PropTypes

DeleteJobMenuItem.propTypes = {
    id: string.isRequired,
}

export default DeleteJobMenuItem
