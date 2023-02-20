import React, { useState } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { CircularLoader, Layer, CenteredContent } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import StoreContext from './StoreContext'

const jobsQuery = {
    jobs: {
        resource: 'scheduler',
        params: {
            fields: '*',
            paging: false,
        },
    },
}

const jobTypesQuery = {
    jobTypes: {
        resource: 'jobConfigurations/jobTypes',
        params: {
            fields: '*',
            paging: false,
        },
    },
}

const optionsQuery = {
    // Used by the ANALYTICS_TABLE and CONTINUOUS_ANALYTICS_TABLE job types
    skipTableTypes: {
        resource: 'analytics/tableTypes',
    },

    // Used by the MONITORING job type
    validationRuleGroups: {
        resource: 'validationRuleGroups',
        params: {
            paging: false,
        },
    },

    // Used by the PUSH_ANALYSIS job type
    pushAnalysis: {
        resource: 'pushAnalysis',
        params: {
            paging: false,
        },
    },

    // Used by the PREDICTOR job type
    predictors: {
        resource: 'predictors',
        params: {
            paging: false,
        },
    },
    predictorGroups: {
        resource: 'predictorGroups',
        params: {
            paging: false,
        },
    },
    dataIntegrityChecks: {
        resource: 'dataIntegrity',
    },
}

const Store = ({ children }) => {
    // State that should persist after a refetch
    const jobFilterState = useState('')
    const showSystemJobsState = useState(false)

    const jobsFetch = useDataQuery(jobsQuery)
    const jobTypesFetch = useDataQuery(jobTypesQuery)
    const optionsFetch = useDataQuery(optionsQuery)

    const loading =
        jobsFetch.loading || jobTypesFetch.loading || optionsFetch.loading

    if (loading) {
        return (
            <Layer>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </Layer>
        )
    }

    const error = jobsFetch.error || jobTypesFetch.error || optionsFetch.error

    if (error) {
        /**
         * The app can't continue if this fails, because it doesn't
         * have any data, so throw the error.
         */
        throw error
    }
    const { jobs } = jobsFetch.data
    const { jobTypes } = jobTypesFetch.data.jobTypes
    const {
        skipTableTypes,
        validationRuleGroups: { validationRuleGroups },
        pushAnalysis: { pushAnalysis },
        predictors: { predictors },
        predictorGroups: { predictorGroups },
        dataIntegrityChecks,
    } = optionsFetch.data
    const parameterOptions = {
        skipTableTypes,
        validationRuleGroups,
        pushAnalysis,
        predictors,
        predictorGroups,
        dataIntegrityChecks,
    }

    return (
        <StoreContext.Provider
            value={{
                jobs,
                jobTypes,
                parameterOptions,
                refetchJobs: jobsFetch.refetch,
                jobFilter: jobFilterState,
                showSystemJobs: showSystemJobsState,
            }}
        >
            {children}
        </StoreContext.Provider>
    )
}

const { node } = PropTypes

Store.propTypes = {
    children: node.isRequired,
}

export default Store
