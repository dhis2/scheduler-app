import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@dhis2/ui'
import history from '../../services/history'
import { DiscardFormModal } from '../Modal'

const DiscardFormButton = ({ shouldConfirm, children, small, className }) => {
    const [showModal, setShowModal] = useState(false)
    const onClick = shouldConfirm
        ? () => setShowModal(true)
        : () => history.push('/')

    return (
        <React.Fragment>
            <Button onClick={onClick} small={small} className={className}>
                {children}
            </Button>
            {showModal && (
                <DiscardFormModal
                    hideModal={
                        /* istanbul ignore next */
                        () => setShowModal(false)
                    }
                />
            )}
        </React.Fragment>
    )
}

DiscardFormButton.defaultProps = {
    className: '',
    shouldConfirm: false,
    small: false,
}

const { string, bool } = PropTypes

DiscardFormButton.propTypes = {
    children: string.isRequired,
    className: string,
    shouldConfirm: bool,
    small: bool,
}

export default DiscardFormButton
