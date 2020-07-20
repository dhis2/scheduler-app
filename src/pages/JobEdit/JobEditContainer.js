import React, { useState } from 'react'
import { CircularLoader, Layer, CenteredContent } from '@dhis2/ui'
import { useParams } from 'react-router-dom'
import { useDataQuery } from '@dhis2/app-runtime'
import JobEdit from './JobEdit'

const query = {
    job: {
        resource: 'jobConfigurations',
        id: /* istanbul ignore next */ ({ id }) => id,
        params: {
            paging: false,
        },
    },
}

const JobEditContainer = () => {
    const [isPristine, setIsPristine] = useState(true)
    const { id } = useParams()
    const { loading, error, data } = useDataQuery(query, { variables: { id } })

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
