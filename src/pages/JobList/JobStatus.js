import React from 'react'
import { string } from 'prop-types'
import { Tag } from '@dhis2/ui-core'

const JobStatus = ({ status }) => {
    switch (status) {
        case 'STOPPED':
        case 'DISABLED':
            return <Tag>{status}</Tag>
        case 'RUNNING':
        case 'NOT_STARTED':
        case 'SCHEDULED':
            return <Tag neutral>{status}</Tag>
        case 'FAILED':
            return <Tag negative>{status}</Tag>
        case 'DONE':
            return <Tag positive>{status}</Tag>
        default:
            return null
    }
}

JobStatus.propTypes = {
    status: string.isRequired,
}

export default JobStatus
