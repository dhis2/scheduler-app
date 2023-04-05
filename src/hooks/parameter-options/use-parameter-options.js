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
        const {
            skipTableTypes,
            validationRuleGroups: { validationRuleGroups },
            pushAnalysis: { pushAnalysis },
            predictors: { predictors },
            predictorGroups: { predictorGroups },
            dataIntegrityChecks,
        } = fetch.data
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
