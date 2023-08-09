import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { DeleteSequenceModal } from '../Modal'

const DeleteSequenceButton = ({ name, onSuccess }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <React.Fragment>
            <Button destructive onClick={() => setShowModal(true)}>
                {i18n.t('Delete sequence')}
            </Button>
            {showModal && (
                <DeleteSequenceModal
                    name={name}
                    hideModal={() => setShowModal(false)}
                    onSuccess={onSuccess}
                />
            )}
        </React.Fragment>
    )
}

const { string, func } = PropTypes

DeleteSequenceButton.propTypes = {
    name: string.isRequired,
    onSuccess: func.isRequired,
}

export default DeleteSequenceButton
