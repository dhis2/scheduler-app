import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useJob from '../../cached-hooks/use-job'
import JobEdit from './JobEdit'

const JobEditContainer = () => {
    const [isPristine, setIsPristine] = useState(true)
    const { id } = useParams()
    const { isLoading, isError, data } = useJob(id)

    if (isLoading) {
        return 'Loading'
    }

    if (isError) {
        return 'Error'
    }

    const { job } = data

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
