import React from 'react'
import { string } from 'prop-types'
import { MenuItem } from '@dhis2/ui-core'
import history from '../../services/history'

const EditJobMenuItem = ({ id }) => (
    <MenuItem dense onClick={() => history.push(`/edit/${id}`)} label="Edit" />
)

EditJobMenuItem.propTypes = {
    id: string.isRequired,
}

export default EditJobMenuItem
