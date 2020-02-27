import React from 'react'
import { func, string } from 'prop-types'
import { connect } from 'react-redux'
import { MenuItem } from '@dhis2/ui-core'
import { actions } from '../../data/modal'
import { modalTypes } from '../../components/Modal'

export const DumbRunJobMenuItem = ({ id, showModal }) => (
    <MenuItem
        dense
        onClick={() => showModal({ type: modalTypes.RUN_JOB, props: { id } })}
        label="Run manually"
    />
)

DumbRunJobMenuItem.propTypes = {
    id: string.isRequired,
    showModal: func.isRequired,
}

const mapDispatchToProps = {
    showModal: actions.showModal,
}

export default connect(
    null,
    mapDispatchToProps
)(DumbRunJobMenuItem)
