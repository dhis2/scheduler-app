import React from 'react'
import { TableRow, TableCell } from '@dhis2/ui'
import PropTypes from 'prop-types'
import { jobTypesMap } from '../../services/server-translations'
import styles from './ExpandableRow.module.css'

const ExpandableRow = ({ job }) => {
    return (
        <TableRow className={styles.row} suppressZebraStriping>
            <TableCell />
            <TableCell className={styles.indent}>{job.name}</TableCell>
            <TableCell className={styles.indent} colSpan="6">
                {jobTypesMap[job.type]}
            </TableCell>
        </TableRow>
    )
}

const { shape, string } = PropTypes

ExpandableRow.propTypes = {
    job: shape({
        name: string.isRequired,
        type: string.isRequired,
    }).isRequired,
}

export default ExpandableRow
