import React from 'react'
import { shape, string } from 'prop-types'

const JobListItem = ({ job }) => {
    const {
        displayName,
        jobType,
        cronExpression,
        jobStatus,
        nextExecutionTime,
    } = job

    return (
        <tr>
            <td>{displayName}</td>
            <td>{jobType}</td>
            <td>{cronExpression}</td>
            <td>{nextExecutionTime}</td>
            <td>{jobStatus}</td>
            <td>On/onff button here</td>
            <td>Context menu here</td>
        </tr>
    )
}

JobListItem.propTypes = {
    job: shape({
        displayName: string,
        jobType: string,
        cronExpression: string,
        nextExecutionTime: string,
        jobStatus: string,
    }).isRequired,
}

export default JobListItem
