import React from 'react'
import { connect } from 'react-redux'
import { string, object } from 'prop-types'
import * as rootSelectors from '../../rootSelectors'
import { selectors } from '../../data/modal'
import * as modalTypes from './modalTypes'
import DiscardFormModal from './DiscardFormModal'
import DeleteJobModal from './DeleteJobModal'
import RunJobModal from './RunJobModal'

export const UnconnectedModalContainer = ({ type, props }) => {
    switch (type) {
        case modalTypes.DISCARD_FORM:
            return <DiscardFormModal {...props} />
        case modalTypes.DELETE_JOB:
            return <DeleteJobModal {...props} />
        case modalTypes.RUN_JOB:
            return <RunJobModal {...props} />
        default:
            return null
    }
}

UnconnectedModalContainer.defaultProps = {
    type: null,
    props: {},
}

UnconnectedModalContainer.propTypes = {
    type: string,
    props: object,
}

const mapStateToProps = state => {
    /* istanbul ignore next */
    const modal = rootSelectors.getModal(state)

    /* istanbul ignore next */
    return {
        type: selectors.getType(modal),
        props: selectors.getProps(modal),
    }
}

export default connect(mapStateToProps)(UnconnectedModalContainer)
