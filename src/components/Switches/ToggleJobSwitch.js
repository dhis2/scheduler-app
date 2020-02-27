import React from 'react'
import { func, string, bool } from 'prop-types'
import { connect } from 'react-redux'
import { Switch } from '@dhis2/ui-core'
import { actions } from '../../data/jobs'

export const DumbToggleJobSwitch = ({ id, checked, enableJob, disableJob }) => {
    const toggleJob = checked ? disableJob : enableJob

    return <Switch checked={checked} onChange={() => toggleJob(id)} />
}

DumbToggleJobSwitch.propTypes = {
    id: string.isRequired,
    checked: bool.isRequired,
    enableJob: func.isRequired,
    disableJob: func.isRequired,
}

const mapDispatchToProps = {
    enableJob: actions.enableJob,
    disableJob: actions.disableJob,
}

export default connect(
    null,
    mapDispatchToProps
)(DumbToggleJobSwitch)
