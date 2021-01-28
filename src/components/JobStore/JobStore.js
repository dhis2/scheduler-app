import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { CircularLoader, Layer, CenteredContent } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import JobContext from './JobContext'

const query = {
    jobs: {
        resource: 'jobConfigurations',
        params: {
            fields: '*',
            paging: false,
        },
    },
}

const JobStore = ({ children }) => {
    const { loading, error, data, refetch } = useDataQuery(query)

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
         * have any jobs, so throw the error.
         */
        throw error
    }

    const { jobConfigurations: jobs } = data.jobs

    return (
        <JobContext.Provider
            value={{
                refetch,
                jobs,
            }}
        >
            {children}
        </JobContext.Provider>
    )
}

const { node } = PropTypes

JobStore.propTypes = {
    children: node.isRequired,
}

export default JobStore
