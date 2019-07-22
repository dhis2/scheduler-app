import React from 'react'
import { string, func, bool } from 'prop-types'
import { connect } from 'react-redux'
import { Button } from '@dhis2/ui-core'
import { actions } from '../../data/modal'
import { modalTypes } from '../Modal'
import history from '../../services/history'

export const UnconnectedDiscardFormButton = ({
    shouldConfirm,
    children,
    showModal,
}) => {
    const onClick = shouldConfirm
        ? () => showModal({ type: modalTypes.DISCARD_FORM })
        : () => history.push('/')

    return <Button onClick={onClick}>{children}</Button>
}

UnconnectedDiscardFormButton.propTypes = {
    children: string.isRequired,
    shouldConfirm: bool.isRequired,
    showModal: func.isRequired,
}

const mapDispatchToProps = {
    showModal: actions.showModal,
}

export default connect(
    null,
    mapDispatchToProps
)(UnconnectedDiscardFormButton)
