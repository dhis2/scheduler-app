import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { FlyoutMenu, DropdownButton } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import EditJobAction from './EditJobAction'
import RunJobAction from './RunJobAction'
import DeleteJobAction from './DeleteJobAction'

const Actions = ({ id, configurable }) => (
    <DropdownButton
        small
        component={
            <FlyoutMenu>
                {configurable && <EditJobAction id={id} />}
                <RunJobAction id={id} />
                <DeleteJobAction id={id} />
            </FlyoutMenu>
        }
    >
        {i18n.t('Actions')}
    </DropdownButton>
)

Actions.defaultProps = {
    configurable: false,
}

const { string, bool } = PropTypes

Actions.propTypes = {
    id: string.isRequired,
    configurable: bool,
}

export default Actions
