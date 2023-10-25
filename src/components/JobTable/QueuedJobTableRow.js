import React from 'react'
import { TableRow, TableCell } from '@dhis2/ui'
import PropTypes from 'prop-types'
import { jobTypesMap } from '../../services/server-translations'

const QueuedJobTableRow = ({ job }) => {
    return (
        <TableRow>
            <TableCell />
            <TableCell>{job.name}</TableCell>
            <TableCell colSpan="6">{jobTypesMap[job.type]}</TableCell>
        </TableRow>
    )
}

const { shape, string } = PropTypes

QueuedJobTableRow.propTypes = {
    job: shape({
        name: string.isRequired,
        type: string.isRequired,
    }).isRequired,
}

export default QueuedJobTableRow
