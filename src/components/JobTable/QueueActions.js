import React from 'react'
import PropTypes from 'prop-types'
import { FlyoutMenu, DropdownButton } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import EditQueueAction from './EditQueueAction'
import DeleteQueueAction from './DeleteQueueAction'

const QueueActions = ({ name, refetch }) => (
    <DropdownButton
        small
        component={
            <FlyoutMenu>
                <EditQueueAction name={name} />
                <DeleteQueueAction name={name} onSuccess={refetch} />
            </FlyoutMenu>
        }
    >
        {i18n.t('Actions')}
    </DropdownButton>
)

const { string, func } = PropTypes

QueueActions.propTypes = {
    name: string.isRequired,
    refetch: func.isRequired,
}

export default QueueActions
