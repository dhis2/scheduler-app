import React from 'react'
import moment from 'moment'
import { bool, shape, string } from 'prop-types'
import cronstrue from 'cronstrue'
import { TableRow, TableCell } from '@dhis2/ui-core'
import { ToggleJobSwitch } from '../../components/Switches'
import JobListActions from './JobListActions'
import JobStatus from './JobStatus'

/**
 * The use of moment below is to display in how much time the task
 * will run again. This should always be in the future (so, 'in xxx
 * hours', etc). At the moment though, we sometimes receive timestamps
 * that are in the past, which will cause the displayed relative time
 * to refer to the past as well ('xxx hours ago', etc.).
 *
 * Besides that, according to the moment docs you would expect toNow()
 * to be the correct method, as all those examples are describing future
 * events. But using fromNow() actually results in future relative time,
 * so that could be a mistake in the moment docs.
 */

const JobListTableItem = ({
    job: {
        id,
        displayName,
        jobType,
        cronExpression,
        jobStatus,
        nextExecutionTime,
        enabled,
    },
}) => (
    <TableRow>
        <TableCell>{displayName}</TableCell>
        <TableCell>{jobType}</TableCell>
        <TableCell>{cronstrue.toString(cronExpression)}</TableCell>
        <TableCell>{moment(nextExecutionTime).fromNow()}</TableCell>
        <TableCell>
            <JobStatus status={jobStatus} />
        </TableCell>
        <TableCell>
            <ToggleJobSwitch id={id} checked={enabled} />
        </TableCell>
        <TableCell>
            <JobListActions id={id} />
        </TableCell>
    </TableRow>
)

JobListTableItem.propTypes = {
    job: shape({
        id: string.isRequired,
        displayName: string.isRequired,
        jobType: string.isRequired,
        cronExpression: string.isRequired,
        nextExecutionTime: string.isRequired,
        jobStatus: string.isRequired,
        enabled: bool.isRequired,
    }).isRequired,
}

export default JobListTableItem
