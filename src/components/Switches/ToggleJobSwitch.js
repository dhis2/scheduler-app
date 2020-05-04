import React, { useContext } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { Switch } from '@dhis2/ui'
import { useToggleJob } from '../../hooks/jobs'
import { RefetchJobsContext } from '../Context'

const ToggleJobSwitch = ({ id, checked }) => {
    const [toggleJob, { loading }] = useToggleJob()
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
