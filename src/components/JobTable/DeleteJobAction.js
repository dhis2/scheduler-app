import React, { useState } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { MenuItem } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { DeleteJobModal } from '../Modal'
import { hooks } from '../Store'

const DeleteJobAction = ({ id }) => {
    const [showModal, setShowModal] = useState(false)
    const refetchJobs = hooks.useRefetchJobs()

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
                    onSuccess={refetchJobs}
                />
            )}
        </React.Fragment>
    )
}

const { string } = PropTypes

DeleteJobAction.propTypes = {
    id: string.isRequired,
}

export default DeleteJobAction
