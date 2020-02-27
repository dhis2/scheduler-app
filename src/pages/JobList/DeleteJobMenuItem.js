import React from 'react'
import { func, string } from 'prop-types'
import { connect } from 'react-redux'
import { MenuItem } from '@dhis2/ui-core'
import { actions } from '../../data/modal'
import { modalTypes } from '../../components/Modal'

export const DumbDeleteJobMenuItem = ({ id, showModal }) => (
    <MenuItem
        dense
        destructive
        onClick={() =>
            showModal({ type: modalTypes.DELETE_JOB, props: { id } })
        }
        label="Delete"
    />
)

DumbDeleteJobMenuItem.propTypes = {
    id: string.isRequired,
    showModal: func.isRequired,
}

const mapDispatchToProps = {
    showModal: actions.showModal,
}

export default connect(
    null,
    mapDispatchToProps
)(DumbDeleteJobMenuItem)
