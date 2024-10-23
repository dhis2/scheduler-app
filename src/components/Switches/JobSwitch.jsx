import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '@dhis2/ui'

const JobSwitch = ({ id, checked, disabled, refetch }) => {
    const [disableQuery] = useState({
        resource: `jobConfigurations/${id}/disable`,
        type: 'create',
    })
    const [enableQuery] = useState({
        resource: `jobConfigurations/${id}/enable`,
        type: 'create',
    })
    const [disableJob, disableMutation] = useDataMutation(disableQuery)
    const [enableJob, enableMutation] = useDataMutation(enableQuery)

    const toggleJob = checked ? disableJob : enableJob
    const loading = disableMutation.loading || enableMutation.loading

    return (
        <Switch
            name={`toggle-job-${id}`}
            disabled={disabled || loading}
            checked={checked}
            onChange={() => {
                toggleJob().then(refetch)
            }}
            ariaLabel={checked ? i18n.t('Disable') : i18n.t('Enable')}
        />
    )
}

const { bool, string, func } = PropTypes

JobSwitch.propTypes = {
    checked: bool.isRequired,
    disabled: bool.isRequired,
    id: string.isRequired,
    refetch: func.isRequired,
}

export default JobSwitch
