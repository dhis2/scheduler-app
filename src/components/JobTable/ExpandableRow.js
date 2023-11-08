import React from 'react'
import { TableRow, TableCell } from '@dhis2/ui'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { jobTypesMap } from '../../services/server-translations'
import styles from './ExpandableRow.module.css'

const ExpandableRow = ({ job, isFirst, isLast }) => {
    return (
        <TableRow
            className={cx(styles.row, {
                [styles.first]: isFirst,
                [styles.last]: isLast,
            })}
            suppressZebraStriping
        >
            <TableCell className={styles.cell} />
            <TableCell className={styles.cell}>{job.name}</TableCell>
            <TableCell className={styles.cell} colSpan="6">
                {jobTypesMap[job.type]}
            </TableCell>
        </TableRow>
    )
}

const { shape, string } = PropTypes

ExpandableRow.propTypes = {
    isFirst: string.isRequired,
    isLast: string.isRequired,
    job: shape({
        name: string.isRequired,
        type: string.isRequired,
    }).isRequired,
}

export default ExpandableRow
