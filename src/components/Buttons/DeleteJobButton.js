import React, { useState } from 'react'
import { string } from 'prop-types'
import { Button } from '@dhis2/ui-core'
import { DeleteJobModal } from '../Modal'

const DeleteJobButton = ({ id }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <React.Fragment>
            <Button destructive onClick={() => setShowModal(true)}>
                Delete
            </Button>
            {showModal && (
                <DeleteJobModal id={id} hideModal={() => setShowModal(false)} />
            )}
        </React.Fragment>
    )
}

DeleteJobButton.propTypes = {
    id: string.isRequired,
}

export default DeleteJobButton
