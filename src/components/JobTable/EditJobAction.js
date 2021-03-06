import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { MenuItem } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import history from '../../services/history'

const EditJobAction = ({ id }) => (
    <MenuItem
        dense
        onClick={() => history.push(`/edit/${id}`)}
        label={i18n.t('Edit')}
    />
)

const { string } = PropTypes

EditJobAction.propTypes = {
    id: string.isRequired,
}

export default EditJobAction
