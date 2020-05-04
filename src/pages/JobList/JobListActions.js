import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { Menu, DropdownButton } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import EditJobMenuItem from './EditJobMenuItem'
import RunJobMenuItem from './RunJobMenuItem'
import DeleteJobMenuItem from './DeleteJobMenuItem'

const JobListActions = ({ id }) => (
    <DropdownButton
        small
        component={
            <Menu>
                <EditJobMenuItem id={id} />
                <RunJobMenuItem id={id} />
                <DeleteJobMenuItem id={id} />
            </Menu>
        }
    >
        {i18n.t('Actions')}
    </DropdownButton>
)

const { string } = PropTypes

JobListActions.propTypes = {
    id: string.isRequired,
}

export default JobListActions
