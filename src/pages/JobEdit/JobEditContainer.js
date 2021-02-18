import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { StoreContext, selectors } from '../../components/Store'
import JobEdit from './JobEdit'

const JobEditContainer = () => {
    const store = useContext(StoreContext)
    const [isPristine, setIsPristine] = useState(true)
    const { id } = useParams()
    const job = selectors.getJobById(store, id)

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
