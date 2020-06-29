import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDataQuery } from '@dhis2/app-runtime'
import { CircularLoader, Layer, CenteredContent } from '@dhis2/ui'
import JobEdit from './JobEdit'

const query = {
    job: {
        resource: 'jobConfigurations',
        id: ({ id }) => id,
    },
}

const options = {
    lazy: true,
}

const JobEditContainer = () => {
    const { id } = useParams()
    const [isPristine, setIsPristine] = useState(true)
    const { loading, error, data, refetch, called } = useDataQuery(
        query,
        options
    )

    useEffect(() => {
        const shouldFetch = !called && !loading

        if (shouldFetch) {
            refetch({ id })
        }
    })

    if (loading || !called) {
        return (
            <Layer>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </Layer>
        )
    }

    if (error) {
        /**
         * The app can't continue if this fails, because it doesn't
         * have the job data, so throw the error.
         */
        throw error
    }

    return (
        <JobEdit
            isPristine={isPristine}
            setIsPristine={setIsPristine}
            name={data.job.name}
        />
    )
}

export default JobEditContainer
