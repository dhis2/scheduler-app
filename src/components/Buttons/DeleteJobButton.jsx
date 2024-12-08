import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { DeleteJobModal } from '../Modal'

const DeleteJobButton = ({ id, onSuccess }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <React.Fragment>
            <Button destructive onClick={() => setShowModal(true)}>
                {i18n.t('Delete job')}
            </Button>
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

DeleteJobButton.propTypes = {
    id: string.isRequired,
    onSuccess: func.isRequired,
}

export default DeleteJobButton
