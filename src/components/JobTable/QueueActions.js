import React from 'react'
import PropTypes from 'prop-types'
import { FlyoutMenu, DropdownButton } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import EditQueueAction from './EditQueueAction'
import RunQueueAction from './RunQueueAction'
import DeleteQueueAction from './DeleteQueueAction'

const QueueActions = ({ name, refetch, id, enabled }) => (
    <DropdownButton
        small
        component={
            <FlyoutMenu>
                <EditQueueAction name={name} />
                <RunQueueAction
                    enabled={enabled}
                    id={id}
                    onComplete={refetch}
                />
                <DeleteQueueAction name={name} onSuccess={refetch} />
            </FlyoutMenu>
        }
    >
        {i18n.t('Actions')}
    </DropdownButton>
)

const { string, func, bool } = PropTypes

QueueActions.propTypes = {
    enabled: bool.isRequired,
    id: string.isRequired,
    name: string.isRequired,
    refetch: func.isRequired,
}

export default QueueActions
