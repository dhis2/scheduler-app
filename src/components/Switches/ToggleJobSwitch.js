import React, { useContext } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { Switch } from '@dhis2/ui'
import { useDataMutation } from '@dhis2/app-runtime'
import { StoreContext, selectors } from '../Store'

/* istanbul ignore next */
const mutation = {
    resource: 'jobConfigurations',
    id: ({ id }) => id,
    type: 'update',
    partial: true,
    data: ({ enabled }) => ({ enabled }),
}

const ToggleJobSwitch = ({ id, checked, disabled }) => {
    const [toggleJob, { loading }] = useDataMutation(mutation)
    const store = useContext(StoreContext)
    const refetchJobs = selectors.getRefetchJobs(store)
    const enabled = !checked

    return (
        <Switch
            name={`toggle-job-${id}`}
            disabled={disabled || loading}
            checked={checked}
            onChange={() => {
                toggleJob({ id, enabled }).then(() => refetchJobs())
            }}
        />
    )
}

const { bool, string } = PropTypes

ToggleJobSwitch.propTypes = {
    checked: bool.isRequired,
    disabled: bool.isRequired,
    id: string.isRequired,
}

export default ToggleJobSwitch
