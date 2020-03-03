import React, { useState } from 'react'
import { string } from 'prop-types'
import { MenuItem } from '@dhis2/ui-core'
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
                label="Delete"
            />
            {showModal && (
                <DeleteJobModal id={id} hideModal={() => setShowModal(false)} />
            )}
        </React.Fragment>
    )
}

DeleteJobMenuItem.propTypes = {
    id: string.isRequired,
}

export default DeleteJobMenuItem
