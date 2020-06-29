import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { FlyoutMenu, DropdownButton } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import EditJobMenuItem from './EditJobMenuItem'
import RunJobMenuItem from './RunJobMenuItem'
import DeleteJobMenuItem from './DeleteJobMenuItem'

const JobListActions = ({ id, configurable }) => (
    <DropdownButton
        small
        component={
            <FlyoutMenu>
                {configurable && <EditJobMenuItem id={id} />}
                <RunJobMenuItem id={id} />
                <DeleteJobMenuItem id={id} />
            </FlyoutMenu>
        }
    >
        {i18n.t('Actions')}
    </DropdownButton>
)

JobListActions.defaultProps = {
    configurable: false,
}

const { string, bool } = PropTypes

JobListActions.propTypes = {
    id: string.isRequired,
    configurable: bool,
}

export default JobListActions
