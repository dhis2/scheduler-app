import React from 'react'
import PropTypes from 'prop-types'
import { FlyoutMenu, DropdownButton } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import EditJobAction from './EditJobAction.jsx'
import ViewJobAction from './ViewJobAction.jsx'
import RunJobAction from './RunJobAction.jsx'
import DeleteJobAction from './DeleteJobAction.jsx'

const JobActions = ({ id, configurable, enabled, refetch }) => (
    <DropdownButton
        small
        component={
            <FlyoutMenu>
                {configurable ? (
                    <EditJobAction id={id} />
                ) : (
                    <ViewJobAction id={id} />
                )}
                <RunJobAction enabled={enabled} id={id} onComplete={refetch} />
                {configurable && (
                    <DeleteJobAction id={id} onSuccess={refetch} />
                )}
            </FlyoutMenu>
        }
    >
        {i18n.t('Actions')}
    </DropdownButton>
)

JobActions.defaultProps = {
    configurable: false,
}

const { string, bool, func } = PropTypes

JobActions.propTypes = {
    id: string.isRequired,
    refetch: func.isRequired,
    configurable: bool,
    enabled: bool,
}

export default JobActions
