import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { FlyoutMenu, DropdownButton } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import EditJobAction from './EditJobAction'
import ViewJobAction from './ViewJobAction'
import RunJobAction from './RunJobAction'
import DeleteJobAction from './DeleteJobAction'

const Actions = ({ id, configurable, enabled, refetch }) => (
    <DropdownButton
        small
        component={
            <FlyoutMenu>
                {configurable ? (
                    <EditJobAction id={id} />
                ) : (
                    <ViewJobAction id={id} />
                )}
                {configurable && (
                    <RunJobAction enabled={enabled} id={id} refetch={refetch} />
                )}
                {configurable && <DeleteJobAction id={id} />}
            </FlyoutMenu>
        }
    >
        {i18n.t('Actions')}
    </DropdownButton>
)

Actions.defaultProps = {
    configurable: false,
}

const { string, bool, func } = PropTypes

Actions.propTypes = {
    id: string.isRequired,
    refetch: func.isRequired,
    configurable: bool,
    enabled: bool,
}

export default Actions
