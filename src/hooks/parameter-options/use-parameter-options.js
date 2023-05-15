import { useDataQuery } from '@dhis2/app-runtime'

const query = {
    skipTableTypes: {
        resource: 'analytics/tableTypes',
    },
    validationRuleGroups: {
        resource: 'validationRuleGroups',
        params: {
            paging: false,
        },
    },
    pushAnalysis: {
        resource: 'pushAnalysis',
        params: {
            paging: false,
        },
    },
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

const useParameterOptions = () => {
    const fetch = useDataQuery(query)

    // Remove nesting from data
    if (fetch.data) {
        const skipTableTypes = fetch.data?.skipTableTypes
        const validationRuleGroups =
            fetch.data?.validationRuleGroups?.validationRuleGroups
        const pushAnalysis = fetch.data?.pushAnalysis?.pushAnalysis
        const predictors = fetch.data?.predictors?.predictors
        const predictorGroups = fetch.data?.predictorGroups?.predictorGroups
        const dataIntegrityChecks = fetch.data?.dataIntegrityChecks

        if (
            !skipTableTypes ||
            !validationRuleGroups ||
            !pushAnalysis ||
            !predictors ||
            !predictorGroups ||
            !dataIntegrityChecks
        ) {
            const error = new Error(
                'Did not receive the expected parameter options'
            )
            return { ...fetch, error, data: undefined }
        }

        const data = {
            skipTableTypes,
            validationRuleGroups,
            pushAnalysis,
            predictors,
            predictorGroups,
            dataIntegrityChecks,
        }

        return { ...fetch, data }
    }

    return fetch
}

export default useParameterOptions
