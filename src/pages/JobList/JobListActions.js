import React from 'react'
import { string } from 'prop-types'
import { Menu, DropdownButton } from '@dhis2/ui-core'
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
        Actions
    </DropdownButton>
)

JobListActions.propTypes = {
    id: string.isRequired,
}

export default JobListActions
