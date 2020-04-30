import React, { useState } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { Button } from '@dhis2/ui'
import history from '../../services/history'
import { DiscardFormModal } from '../Modal'

const DiscardFormButton = ({ shouldConfirm, children }) => {
    const [showModal, setShowModal] = useState(false)
    const onClick = shouldConfirm
        ? () => setShowModal(true)
        : () => history.push('/')

    return (
        <React.Fragment>
            <Button onClick={onClick}>{children}</Button>
            {showModal && (
                <DiscardFormModal hideModal={() => setShowModal(false)} />
            )}
        </React.Fragment>
    )
}

DiscardFormButton.defaultProps = {
    shouldConfirm: false,
}

DiscardFormButton.propTypes = {
    children: PropTypes.string.isRequired,
    shouldConfirm: PropTypes.bool,
}

export default DiscardFormButton
