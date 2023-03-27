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
        name,
        type,
        cronExpression,
        delay,
        status,
        nextExecutionTime,
        enabled,
        configurable,
    },
}) => (
    <TableRow>
        <TableCell role="rowheader">{name}</TableCell>
        <TableCell>{jobTypesMap[type]}</TableCell>
        <TableCell>
            <Schedule cronExpression={cronExpression} delay={delay} />
        </TableCell>
        <TableCell>
            <NextRun nextExecutionTime={nextExecutionTime} enabled={enabled} />
        </TableCell>
        <TableCell>
            <Status status={status} />
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
        name: string.isRequired,
        enabled: bool.isRequired,
        id: string.isRequired,
        status: string.isRequired,
        type: string.isRequired,
        cronExpression: string,
        delay: number,
        nextExecutionTime: string,
    }).isRequired,
}

export default JobTableRow
