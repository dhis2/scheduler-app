import React from 'react'
import { bool, shape, string } from 'prop-types'
import cronstrue from 'cronstrue'
import { TableRow, TableCell } from '@dhis2/ui-core'
import { ToggleJobSwitch } from '../../components/Switches'
import JobListActions from './JobListActions'
import JobStatus from './JobStatus'
import JobNextRun from './JobNextRun'

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
        <TableCell>
            <JobNextRun
                nextExecutionTime={nextExecutionTime}
                enabled={enabled}
            />
        </TableCell>
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
