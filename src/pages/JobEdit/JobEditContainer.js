import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { hooks } from '../../components/Store'
import JobEdit from './JobEdit'

const JobEditContainer = () => {
    const [isPristine, setIsPristine] = useState(true)
    const { id } = useParams()
    const job = hooks.useJob(id)

    return (
        <JobEdit
            isPristine={isPristine}
            setIsPristine={setIsPristine}
            name={job.name}
            created={job.created}
            lastExecutedStatus={job.lastExecutedStatus}
            lastExecuted={job.lastExecuted}
        />
    )
}

export default JobEditContainer
