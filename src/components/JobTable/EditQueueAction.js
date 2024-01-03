import React from 'react'
import PropTypes from 'prop-types'
import { MenuItem } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import history from '../../services/history'

const EditQueueAction = ({ name }) => (
    <MenuItem
        dense
        onClick={() => history.push(`/queue/${name}`)}
        label={i18n.t('Edit')}
    />
)

const { string } = PropTypes

EditQueueAction.propTypes = {
    name: string.isRequired,
}

export default EditQueueAction
