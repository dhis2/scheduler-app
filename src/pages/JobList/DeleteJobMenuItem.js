import React, { useState } from 'react'
import { string } from '@dhis2/prop-types'
import { MenuItem } from '@dhis2/ui-core'
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
                <DeleteJobModal id={id} hideModal={() => setShowModal(false)} />
            )}
        </React.Fragment>
    )
}

DeleteJobMenuItem.propTypes = {
    id: string.isRequired,
}

export default DeleteJobMenuItem
