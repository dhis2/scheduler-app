import React from 'react'
import { func, string, bool } from 'prop-types'
import { connect } from 'react-redux'
import { Switch } from '@dhis2/ui-core'
import * as rootSelectors from '../../rootSelectors'
import { actions, selectors } from '../../data/jobs'

export const UnconnectedToggleJobSwitch = ({
    id,
    checked,
    enableJob,
    disableJob,
    isFetching,
}) => {
    const toggleJob = checked ? disableJob : enableJob

    return (
        <Switch
            disabled={isFetching}
            checked={checked}
            name={`toggle-${id}`}
            onChange={() => toggleJob(id)}
        />
    )
}

UnconnectedToggleJobSwitch.propTypes = {
    id: string.isRequired,
    checked: bool.isRequired,
    enableJob: func.isRequired,
    disableJob: func.isRequired,
    isFetching: bool.isRequired,
}

const mapStateToProps = state => {
    /* istanbul ignore next */
    const jobs = rootSelectors.getJobs(state)

    /* istanbul ignore next */
    return {
        isFetching: selectors.getIsFetching(jobs),
    }
}

const mapDispatchToProps = {
    enableJob: actions.enableJob,
    disableJob: actions.disableJob,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedToggleJobSwitch)
