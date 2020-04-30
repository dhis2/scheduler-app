import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { TableRow, TableCell } from '@dhis2/ui'
import { jobTypesMap } from '../../services/server-translations'
import { ToggleJobSwitch } from '../../components/Switches'
import JobListActions from './JobListActions'
import JobStatus from './JobStatus'
import JobNextRun from './JobNextRun'
import JobSchedule from './JobSchedule'

const JobListTableItem = ({
    job: {
        id,
        displayName,
        jobType,
        cronExpression,
        delay,
        jobStatus,
        nextExecutionTime,
        schedulingType,
        enabled,
    },
}) => (
    <TableRow>
        <TableCell>{displayName}</TableCell>
        <TableCell>{jobTypesMap[jobType]}</TableCell>
        <TableCell>
            <JobSchedule
                cronExpression={cronExpression}
                delay={delay}
                schedulingType={schedulingType}
            />
        </TableCell>
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
    job: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        enabled: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        jobStatus: PropTypes.string.isRequired,
        jobType: PropTypes.string.isRequired,
        schedulingType: PropTypes.string.isRequired,
        cronExpression: PropTypes.string,
        delay: PropTypes.number,
        nextExecutionTime: PropTypes.string,
    }).isRequired,
}

export default JobListTableItem
