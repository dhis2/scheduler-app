import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from '@dhis2/ui'
import { jobStatusMap } from '../../services/server-translations'

const Status = ({ status }) => {
    switch (status) {
        case 'STOPPED':
        case 'DISABLED':
            return <Tag>{jobStatusMap[status]}</Tag>
        case 'RUNNING':
        case 'NOT_STARTED':
        case 'SCHEDULED':
            return <Tag neutral>{jobStatusMap[status]}</Tag>
        case 'FAILED':
            return <Tag negative>{jobStatusMap[status]}</Tag>
        case 'DONE':
            return <Tag positive>{jobStatusMap[status]}</Tag>
        // Unrecognised status
        default:
            return null
    }
}

const { string } = PropTypes

Status.propTypes = {
    status: string.isRequired,
}

export default Status
