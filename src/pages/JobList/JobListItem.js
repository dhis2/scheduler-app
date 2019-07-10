import React from 'react'
import { bool, shape, string } from 'prop-types'
import { ToggleJobSwitch } from '../../components/Switches'
import { DeleteJobButton, RunJobButton } from '../../components/Buttons'

const JobListItem = ({ job }) => {
    const {
        id,
        displayName,
        jobType,
        cronExpression,
        jobStatus,
        nextExecutionTime,
        enabled,
    } = job

    return (
        <tr>
            <td>{displayName}</td>
            <td>{jobType}</td>
            <td>{cronExpression}</td>
            <td>{nextExecutionTime}</td>
            <td>{jobStatus}</td>
            <td>
                <ToggleJobSwitch id={id} checked={enabled} />
            </td>
            <td>
                Context menu here: <DeleteJobButton id={id} />
                <RunJobButton id={id} />
            </td>
        </tr>
    )
}

JobListItem.propTypes = {
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

export default JobListItem
