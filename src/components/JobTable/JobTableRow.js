import React from 'react'
import PropTypes from 'prop-types'
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
    refetch,
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
                refetch={refetch}
            />
        </TableCell>
        <TableCell>
            <Actions
                id={id}
                enabled={enabled}
                configurable={configurable}
                refetch={refetch}
            />
        </TableCell>
    </TableRow>
)

const { shape, string, bool, number, func } = PropTypes

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
    refetch: func.isRequired,
}

export default JobTableRow
