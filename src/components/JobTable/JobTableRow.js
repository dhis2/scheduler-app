import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { TableRow, TableCell } from '@dhis2/ui'
import { jobTypesMap } from '../../services/server-translations'
import { ToggleJobSwitch } from '../Switches'
import Actions from './Actions'
import Status from './Status'
import NextRun from './NextRun'
import Schedule from './Schedule'

const JobTableRow = ({
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
        configurable,
    },
}) => (
    <TableRow>
        <TableCell>{displayName}</TableCell>
        <TableCell>{jobTypesMap[jobType]}</TableCell>
        <TableCell>
            <Schedule
                cronExpression={cronExpression}
                delay={delay}
                schedulingType={schedulingType}
            />
        </TableCell>
        <TableCell>
            <NextRun nextExecutionTime={nextExecutionTime} enabled={enabled} />
        </TableCell>
        <TableCell>
            <Status status={jobStatus} />
        </TableCell>
        <TableCell>
            <ToggleJobSwitch
                id={id}
                checked={enabled}
                disabled={!configurable}
            />
        </TableCell>
        <TableCell>
            <Actions id={id} configurable={configurable} />
        </TableCell>
    </TableRow>
)

const { shape, string, bool, number } = PropTypes

JobTableRow.propTypes = {
    job: shape({
        displayName: string.isRequired,
        enabled: bool.isRequired,
        id: string.isRequired,
        jobStatus: string.isRequired,
        jobType: string.isRequired,
        schedulingType: string.isRequired,
        cronExpression: string,
        delay: number,
        nextExecutionTime: string,
    }).isRequired,
}

export default JobTableRow
