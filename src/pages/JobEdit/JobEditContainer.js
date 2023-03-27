import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CircularLoader, Layer, CenteredContent } from '@dhis2/ui'
import { useJobById } from '../../hooks/jobs'
import JobEdit from './JobEdit'

const JobEditContainer = () => {
    const [isPristine, setIsPristine] = useState(true)
    const { id } = useParams()
    const { data, loading, error } = useJobById(id)

    if (loading) {
        return (
            <Layer>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </Layer>
        )
    }

    if (error) {
        throw error
    }

    return (
        <JobEdit
            isPristine={isPristine}
            setIsPristine={setIsPristine}
            name={data.name}
            created={data.created}
            lastExecutedStatus={data.lastExecutedStatus}
            lastExecuted={data.lastExecuted}
        />
    )
}

export default JobEditContainer
