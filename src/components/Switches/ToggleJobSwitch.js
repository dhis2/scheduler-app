import React, { useContext } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { Switch } from '@dhis2/ui'
import { useDataMutation } from '@dhis2/app-runtime'
import { RefetchJobsContext } from '../Context'

/* istanbul ignore next */
const mutation = {
    resource: 'jobConfigurations',
    id: ({ id }) => id,
    type: 'update',
    partial: true,
    data: ({ enabled }) => ({ enabled }),
}

const ToggleJobSwitch = ({ id, checked }) => {
    const [toggleJob, { loading }] = useDataMutation(mutation)
    const refetch = useContext(RefetchJobsContext)
    const enabled = !checked

    return (
        <Switch
            name={`toggle-job-${id}`}
            disabled={loading}
            checked={checked}
            onChange={() => {
                toggleJob({ id, enabled }).then(() => refetch())
            }}
        />
    )
}

const { bool, string } = PropTypes

ToggleJobSwitch.propTypes = {
    checked: bool.isRequired,
    id: string.isRequired,
}

export default ToggleJobSwitch
