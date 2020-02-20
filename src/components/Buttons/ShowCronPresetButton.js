import React from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { Button } from '@dhis2/ui-core'
import { actions } from '../../data/modal'
import { modalTypes } from '../Modal'

export const DumbShowCronPresetButton = ({ showModal }) => {
    return (
        <Button
            primary
            onClick={() => showModal({ type: modalTypes.CRON_PRESET })}
        >
            Choose from preset times
        </Button>
    )
}

DumbShowCronPresetButton.propTypes = {
    showModal: func.isRequired,
}

const mapDispatchToProps = {
    showModal: actions.showModal,
}

export default connect(
    null,
    mapDispatchToProps
)(DumbShowCronPresetButton)
